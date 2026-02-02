import {Link} from "react-router-dom"
import {Row, Col, BreadcrumbItem} from "reactstrap"

type BreadcrumbProps = {
    title: string,
    breadcrumbItems?: string[]
}

export const Breadcrumb = (props: BreadcrumbProps) => {
    const {title, breadcrumbItems} = props;
    const itemLength = breadcrumbItems?.length;

    return (
        <Row>
            <Col xs="12">
                <div className="page-title-box d-flex align-items-center justify-content-between">
                    <h4 className="mb-0 font-size-18">{title}</h4>
                    <div className="page-title-right">
                        <ol className="breadcrumb m-0">
                            {
                                breadcrumbItems?.map((item, key) => (
                                    <BreadcrumbItem key={key} active={key + 1 === itemLength}>
                                        <Link to="#">{item}</Link>
                                    </BreadcrumbItem>
                                ))
                            }
                        </ol>
                    </div>
                </div>
            </Col>
        </Row>
    )
}
