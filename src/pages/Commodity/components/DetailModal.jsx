import React, { Component } from 'react'
import { Modal } from 'antd'

class DetailModal extends Component {

    render () {
        const { visible, onClose } = this.props
        return (
            <div>
                <Modal title="Basic Modal" visible={visible} onOk={onClose} onCancel={onClose}>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                    <p>Some contents...</p>
                </Modal>
            </div>
        )
    }
}

export default DetailModal