import { Action } from "redux";

export function patternFromRegExp(re: RegExp): any  {
  return (action: Action) => {
    return re.test(action.type);
  };
}
