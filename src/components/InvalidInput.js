import { MdError } from "react-icons/md"

const InvalidInput = ({text, type}) => {
    if (type === "Signin") {
        return (
            <p className="invaldInput"><span><MdError size={20}/></span> {text} <span><MdError size={20}/></span></p>
        );
    } else {
        return (
            <p className="invaldInput invaldInputNewHabit"><span><MdError size={20}/></span> {text} <span><MdError size={20}/></span></p>
        );
    }
  }
  
  export default InvalidInput