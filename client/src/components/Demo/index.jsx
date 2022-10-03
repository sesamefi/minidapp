import { useState, useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import Title from "./Title";
import Cta from "./Cta";
import ContractBtns from "./ContractBtns";
import Desc from "./Desc";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

const Demo = () => {
  const { state } = useEth();
  const [token, setToken] = useState("");
  const [txHash, setTxHash] = useState("");

  useEffect(() => {
    const chain = new Map([
      [1, "ETH"],
      [56, "BNB"],
      [43114, "AVAX"],
      [137, "MATIC"],
      [250, "FTM"],
      [2001, "MADA"],
      [3, "ETH"],
      [43113, "AVAX"],
      [200101, "MTADA"],
      [80001, "MATIC"],
      [280, "ETH"],
      [97, "BNB"],
      [1287, "GLMR"]
    ]);
    setToken(chain.get(state.networkID));
  }, [state]);

  const displayHash = (transactionHash) => {
    setTxHash(transactionHash);
  }


  const demo =
    <>
      <Cta token={token} />
      <div className="contract-container">
        <ContractBtns callback={displayHash}>{token}</ContractBtns>
      </div>
      <Desc networkID={state.networkID}>{txHash}</Desc>
    </>;

  return (
    <div className="demo">
      <Title />
      {
        !state.artifact ? <NoticeNoArtifact /> :
          !state.contract ? <NoticeWrongNetwork /> :
            demo
      }
    </div>
  );
}

export default Demo;
