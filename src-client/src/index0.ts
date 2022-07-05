import { MainView } from "./Main/MainView";
import 'bootstrap'
import { MainModel } from "./Main/MainModel";
import "../scss/main.scss";

(function main() {
  new MainView(MainModel.getInstance());
})()