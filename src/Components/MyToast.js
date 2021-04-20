import React, {Component} from 'react'
import { Toast, ToastHeader } from 'react-bootstrap'

export default class MyToast extends Component {
    render() {
        const toastCss = {
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex:'1',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };

        return (
            <div style={this.props.children.show ?toastCss : null}>
               <Toast className={`border text-white ${this.props.type === "success" ? "border-danger bg-danger" : "border-success bg-success"}`} show={this.props.show}>
               <Toast.Header className={`text-white ${this.props.type === "success" ? "bg-danger" : "bg-success"}`} closeButton={false}>
                        <strong className="mr-auto">Success</strong>
                    </Toast.Header>
                    <Toast.Body>
                        {this.props.children.message}
                    </Toast.Body>
                </Toast>
            </div>
        );
    };

}