import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { BsFillEmojiNeutralFill } from "react-icons/bs";

const Comments = ({heading,comments}) => {
  return (
    <details className="p-4 bg-gray-50 rounded text-gray-700">
      <summary className="cursor-pointer">
        {heading}
      </summary>
      <ul className="p-4 space-y-2">
        {comments.map((c, i) => {
          return (
            <li key={i} className="bg-white p-2 rounded">
              <p>
                {c["comment"].length < 100
                  ? c["comment"]
                  : c["comment"].substring(0, 100) + " ..."}
              </p>
              <div className="flex items-center justify-end space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <span>{c["Positive"]}%</span>
                  <AiFillLike color="#1ba39c" />
                </div>
                <div className="flex items-center space-x-2">
                  <span>{c["Negative"]}%</span>
                  <AiFillDislike color="#96281b" />
                </div>
                <div className="flex items-center space-x-2">
                  <span>{c["Neutral"]}%</span>
                  <BsFillEmojiNeutralFill color="#bd9b19" />
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </details>
  );
};

export default Comments;
