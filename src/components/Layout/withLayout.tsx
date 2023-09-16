import { NextPage } from "next";
import { Layout } from "./Layout";
import { LayoutProps } from "./Type";

// add perpage language support if required and extend T with WithLayoutProps

export function withLayout<T>(Component: NextPage<T>, options: LayoutProps = {}) {
    return ((props) => (
        <Layout {...options}>
            <Component {...props} />
        </Layout>
    )) as NextPage<T>;
}
