import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import { Todo } from "../store";

interface DetailProps {
  toDos: Todo[];
}

function Detail({ toDos }: DetailProps) {
  const { id } = useParams<{ id: string }>();
  const toDo = toDos.find((toDo) => toDo.id === parseInt(id || "", 10));
  console.log(toDo);
  return (
    <div>
      <h1>{toDo?.text}</h1>
      <p>{toDo?.id}</p>
    </div>
  );
}

const mapStateToProps = (state: Todo[]) => ({ toDos: state });

export default connect(mapStateToProps)(Detail);
