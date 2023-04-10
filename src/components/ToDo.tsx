import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { Dispatch } from "redux";
import { remove } from "../store";

// param이 분명 ToDo로 넘어오는데 어떻게 text가 프린트 되나... 고민해보니 이거 {text}로 객체 구조 분해로 되어있어서 되는거였군...ㅎㅎ
function ToDo({
  text,
  onBtnClick,
  id,
}: {
  text: string;
  onBtnClick: any;
  id: number;
}) {
  return (
    <li>
      <Link to={`/${id}`}>{text}</Link>
      <button onClick={onBtnClick}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch: Dispatch, ownProps: any) {
  return {
    onBtnClick: () => dispatch(remove(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(ToDo);
