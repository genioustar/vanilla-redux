import { connect } from "react-redux";
import { Dispatch } from "redux";
import { actionCreators } from "../store";

// param이 분명 ToDo로 넘어오는데 어떻게 text가 프린트 되나... 고민해보니 이거 {text}로 객체 구조 분해로 되어있어서 되는거였군...ㅎㅎ
function ToDo({ text, onBtnClick }: { text: string; onBtnClick: any }) {
  return (
    <li>
      {text} <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: any) {
  console.log(ownProps);
  return {
    onBtnClick: () => dispatch(actionCreators.delToDo(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
