import Header from "@cloudscape-design/components/header";
import {AppLayout, BreadcrumbGroup, ContentLayout} from "@cloudscape-design/components";

export default function FilesAppLayout(props) {

    return (
        <AppLayout
            toolsHide="true"
            navigationHide="true"
            breadcrumbs={ <BreadcrumbGroup items={props.breadcrumbs}/> }
            content={
                <ContentLayout
                    header={
                        <Header
                            variant="h1"
                        >
                            { props.title }
                        </Header>
                    }
                >
                    { props.children }

                </ContentLayout>
            }/>

    );
}