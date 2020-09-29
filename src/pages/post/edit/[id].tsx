import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";

interface UpdatePostProps {}

const UpdatePost: React.FC<UpdatePostProps> = ({}) => {
  return <div>Hellow</div>;
};

export default withUrqlClient(createUrqlClient)(UpdatePost);
