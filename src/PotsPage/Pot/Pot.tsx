import FloatingSelect from "../../util/FloatingSelect/FloatingSelect";
import FloatingSelectOption from "../../util/FloatingSelect/FloatingSelectOption/FloatingSelectOption";
import "./Pot.css";

type PotProps = {
  potData: PotData;
};

type PotData = {
  name: string;
  target: number;
  total: number;
  theme: string;
};

function Pot({ potData }: PotProps) {
  const targetPercent = Number(
    ((potData.total / potData.target) * 100).toFixed(2),
  );
  return (
    <section className="pot">
      <div className="flex pot__top-row">
        <div
          className="pot__color-ball"
          style={{ backgroundColor: potData.theme }}
        ></div>
        <h2 className="pot__title">{potData.name}</h2>
        <FloatingSelect
          frontButton={<div className="pot__ellipsis"></div>}
          className="pot__select"
        >
          <FloatingSelectOption handleClick={() => {}}>
            Edit Pot
          </FloatingSelectOption>
          <FloatingSelectOption handleClick={() => {}}>
            <p className="red-text">Delete Pot</p>
          </FloatingSelectOption>
        </FloatingSelect>
      </div>
      <div className="pot__total-saved">
        <p className="pot__total-saved__label">Total saved</p>
        <p className="pot__total-saved__amount">${potData.total}</p>
      </div>
      <div className="pot__bar pot__bar--bg">
        <div
          className="pot__bar"
          style={{
            backgroundColor: potData.theme,
            width: targetPercent + "%",
          }}
        ></div>
      </div>
      <div className="flex pot__target">
        <p className="pot__target__percent">{targetPercent}%</p>
        <p>Target of ${potData.target}</p>
      </div>
      <div className="pot__btns">
        <button className="pot__btn">+ Add money</button>
        <button className="pot__btn">Withdraw</button>
      </div>
    </section>
  );
}

export default Pot;
