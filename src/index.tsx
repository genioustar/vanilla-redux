const add = document.getElementById("add");
const minus = document.getElementById("minus");
const number = document.querySelector("span");

let count = 0;

if (number) {
  number.innerHTML = count.toString();
}

// 이걸 매 클릭마다 넣어줘야하는 이유는! 데이터는 변했지만 변한 데이터를 html에다가 변한값을 넣어줘야 하기 때문에!
const updateText = () => {
  if (number) {
    number.innerHTML = count.toString();
  }
};
const handleAdd = () => {
  console.log("++++");
  count = count + 1;
  updateText();
};

const handleMinus = () => {
  console.log("----");
  count = count - 1;
  updateText();
};

add?.addEventListener("click", handleAdd);
minus?.addEventListener("click", handleMinus);
export default function Index() {
  return <div></div>;
}
