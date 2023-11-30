import { Helmet } from "react-helmet-async";

const PageTitle = ({ title }: { title: string }) => (
  <Helmet>
    <title>{title}</title>
  </Helmet>
);

export default PageTitle;
