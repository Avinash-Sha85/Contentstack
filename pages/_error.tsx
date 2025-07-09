import { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
}

function Error({ statusCode }: ErrorProps) {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h1>{statusCode || "An error occurred"}</h1>
      <p>
        {statusCode
          ? `A ${statusCode} error occurred on the server`
          : "An error occurred on the client"}
      </p>
    </div>
  );
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res?.statusCode ?? err?.statusCode ?? 404;
  return { statusCode };
};

export default Error;
