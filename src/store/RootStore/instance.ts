import RootStore from "./RootStore";
//делаем signleton,
// чтобы в приложении никто больше не мог создать себе rootstore
const rootStore = new RootStore();

export default rootStore;
