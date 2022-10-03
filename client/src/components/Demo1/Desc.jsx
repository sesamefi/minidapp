import { useNavigate, useLocation } from "react-router-dom";

const Desc = (props) => {
  const navigate = useNavigate();

  const chain = new Map([
    [1, "https://etherscan.io/tx/"],
    [56, "https://bscscan.com/tx/"],
    [43114, "https://snowtrace.io/tx/"],
    [137, "https://polygonscan.com/tx/"],
    [250, "https://testnet.ftmscan.com/tx/"],
    [2001, "https://explorer-mainnet-cardano-evm.c1.milkomeda.com/tx/"],
    [3, "https://ropsten.etherscan.io/tx/"],
    [43113, "https://testnet.snowtrace.io/tx/"],
    [200101, "https://explorer-devnet-cardano-evm.c1.milkomeda.com/tx/"],
    [80001, "https://mumbai.polygonscan.com/tx/"],
    [280, "https://zksync2-testnet.zkscan.io/tx/"],
    [97, "https://testnet.bscscan.com/tx/"],
    [1287, "https://moonbase.moonscan.io/tx/"]
  ]);

  var displayHash, link;
  if (props.children) {
    link = chain.get(props.networkID) + props.children;
    displayHash = <><p>Transaction hash: <span className="code"><a href={link} target="_blank" rel="noreferrer">{props.children}</a></span></p></>;
  }
  return (
    <>
      {displayHash}
      <p>
        Happy participation!
      </p>
      <p>
        <button onClick={() => navigate("/crosschain")}>
          Cross-chain transfer
        </button>
      </p>
    </>
  );
}

export default Desc;
