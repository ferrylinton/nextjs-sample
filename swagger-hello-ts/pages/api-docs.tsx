import { GetStaticProps, InferGetStaticPropsType } from 'next';
import dynamic from 'next/dynamic';
import { SwaggerUIProps } from 'swagger-ui-react';
import spec from '../docs/swagger.json';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<SwaggerUIProps>(import('swagger-ui-react'), { ssr: false });

function ApiDocs({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {

  return {
    props: {
      spec,
    },
  };
};

export default ApiDocs;