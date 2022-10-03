import { useState } from "react";
import Web3, { utils } from "web3";
import styled from 'styled-components';
import useEth from "../../contexts/EthContext/useEth";
import Result from './result';

// Styling a regular HTML input
const StyledInput = styled.input`
  display: block;
  margin: 20px 0px;
  border: 1px solid lightblue;
  text-align: right;
`;
// Creating a custom hook
function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  function onChange(e) {
    setValue(e.target.value);
  }
  return {
    value,
    onChange,
  };
}



const ContractBtns = (props) => {
  const { state: { contract, accounts } } = useEth();
  const [result, setResult] = useState(null);
  const inputProps = useInput();

  const read = async () => {
    const lastAmount = await contract.methods.readAmount().call();
    const lastDonor = await contract.methods.readDonor().call();
    const lastTime = await contract.methods.readTime().call();
    var date = new Date(lastTime*1000);
    date = date.toGMTString();
    setResult({ amount: lastAmount*1e-18, donor: lastDonor, date: date, token: props.children });
  };

  const Send = async () => {
    if (inputProps.value) {
      const transferAmount = utils.toWei(inputProps.value.toString(16), "ether");
      const web3 = new Web3(window.ethereum)
      var balance = await web3.eth.getBalance(accounts[0]);
      balance *= 1e-18;
      if (balance >= transferAmount) {
        const gasEstimate = await web3.eth.estimateGas({ from: accounts[0], to: contract._address, value: transferAmount })
        const params = {
          from: accounts[0],
          to: contract._address,
          gas: '0x' + (gasEstimate + 1).toString(16),
          value: transferAmount
        }
        web3.eth.sendTransaction(params).then((txHash) => props.callback(txHash.transactionHash));
      } else {
        alert("Insufficient account balance");
      }

    };
  }

  return (
    <>
      <div className="btns">


        Amount to send:
        <StyledInput
            {...inputProps}
            placeholder="0"
        />
        &nbsp;
        {props.children}
        <button onClick={Send}>Send</button>

      </div>
      <div className="code">
        <button style={{ padding: 2, borderRadius: 3, border: 0 }} onClick={read}>
          Read contract
        </button>
        <Result result={result} />
      </div>
    </>

  );
}

export default ContractBtns;
