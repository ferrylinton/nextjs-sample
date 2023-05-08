import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { createSwaggerSpec } from 'next-swagger-doc';
import dynamic from 'next/dynamic';
import { SwaggerUIProps } from 'swagger-ui-react';
import 'swagger-ui-react/swagger-ui.css';

const SwaggerUI = dynamic<SwaggerUIProps>(import('swagger-ui-react'), { ssr: false });

function ApiDoc({ spec }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <SwaggerUI spec={spec} />;
}

export const getStaticProps: GetStaticProps = async () => {
  
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: 'pages/api',
    schemaFolders: ['types'],
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello API',
        version: '1.0',
        description: 'Simple description',
        termsOfService: 'http://swagger.io/terms/',
        contact: {
          name: 'Ferry L.H.',
          email: 'ferrylinton@gmail.com',
          url: 'marmeam.com'
        },
        license: {
          name: 'Apache 2.0',
          url: 'http://www.apache.org/licenses/LICENSE-2.0.html'
        }
      },
      externalDocs:{
        description: 'Find out more about Swagger',
        url: 'http://swagger.io'
      },
      schemes: ['http'],
      servers: [{
        url: 'http://localhost:3000'
      }]
    },
  });


  return {
    props: {
      spec,
    },
  };
};

export default ApiDoc;