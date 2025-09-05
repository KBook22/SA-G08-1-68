import React, { useState, useEffect } from 'react';
import { Table, Tag, Button, Typography, Space, Modal, message, Descriptions, Input } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DeleteOutlined, CheckCircleOutlined, ExclamationCircleFilled, EyeOutlined, MessageOutlined } from '@ant-design/icons';
import type { Report } from '../../types';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const ReportsPage: React.FC = () => {
    const [reports, setReports] = useState<Report[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [replyMessage, setReplyMessage] = useState('');

    const loadReports = () => {
        const storedReports = JSON.parse(localStorage.getItem('postReports') || '[]');
        setReports(storedReports);
    };

    useEffect(() => {
        loadReports();
        window.addEventListener('storage', loadReports);
        return () => {
            window.removeEventListener('storage', loadReports);
        };
    }, []);

    const showDetailsModal = (report: Report) => {
        setSelectedReport(report);
        setIsModalVisible(true);
    };

    const handleCancelModal = () => {
        setIsModalVisible(false);
        setReplyMessage('');
        setSelectedReport(null);
    };

    const handleDelete = (postId: number) => {
      showConfirm(`คุณต้องการลบโพสต์ ID: ${postId} ใช่หรือไม่?`, () => {
          console.log('Deleted post:', postId);
          message.success(`ลบโพสต์ ID: ${postId} สำเร็จ`);
      });
    };

    const handleDismiss = (reportId: number) => {
        showConfirm(`คุณต้องการยกเลิกรายงาน ID: ${reportId} ใช่หรือไม่?`, () => {
            console.log('Dismissed report:', reportId);
            message.success(`ยกเลิกรายงาน ID: ${reportId} สำเร็จ`);
        });
    };

    const showConfirm = (title: string, onOk: () => void) => {
        Modal.confirm({
            title,
            icon: <ExclamationCircleFilled />,
            okText: 'ยืนยัน',
            cancelText: 'ยกเลิก',
            onOk,
        });
    };

    const columns: ColumnsType<Report> = [
        { title: 'Report ID', dataIndex: 'id', key: 'id', render: (id) => new Date(id).toLocaleTimeString('th-TH'), sorter: (a, b) => b.id - a.id, defaultSortOrder: 'ascend'},
        { title: 'Post ID', dataIndex: 'postId', key: 'postId' },
        { title: 'ผู้รายงาน', dataIndex: 'reportedBy', key: 'reportedBy' },
        { title: 'เหตุผล', dataIndex: 'reason', key: 'reason', render: (text) => <Tag color="red">{text}</Tag> },
        {
            title: 'การดำเนินการ',
            key: 'action',
            render: (_, record) => (
                <Button 
                    icon={<EyeOutlined />} 
                    onClick={() => showDetailsModal(record)}
                >
                    ตรวจสอบ
                </Button>
            ),
        },
    ];
    
    return (
        <div>
            <Title level={2}>โพสต์ที่ถูกรายงาน</Title>
            <Table columns={columns} dataSource={reports} rowKey="id" />

            <Modal
                title={`รายละเอียดรายงาน #${selectedReport?.id}`}
                open={isModalVisible}
                onCancel={handleCancelModal}
                footer={null}
                width={700}
            >
                {selectedReport && (
                    <Space direction="vertical" style={{ width: '100%' }} size="large">
                        <Descriptions bordered column={1}>
                            <Descriptions.Item label="ผู้รายงาน">{selectedReport.reportedBy}</Descriptions.Item>
                            <Descriptions.Item label="เหตุผลการรายงาน">
                                <Tag color="red">{selectedReport.reason}</Tag>
                            </Descriptions.Item>
                            <Descriptions.Item label="รายละเอียดเพิ่มเติม">
                                {selectedReport.details || 'ไม่มี'}
                            </Descriptions.Item>
                            <Descriptions.Item label="เนื้อหาโพสต์ที่ถูกรายงาน">
                                <Paragraph ellipsis={{ rows: 3, expandable: true, symbol: 'เพิ่มเติม' }}>
                                    {selectedReport.postContent}
                                </Paragraph>
                            </Descriptions.Item>
                        </Descriptions>
                        
                        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
                             <Button 
                                danger 
                                icon={<DeleteOutlined />}
                                onClick={() => handleDelete(selectedReport.postId)}
                            >
                                ลบโพสต์นี้
                            </Button>
                             <Button 
                                icon={<CheckCircleOutlined />}
                                onClick={() => handleDismiss(selectedReport.id)}
                            >
                                ยกเลิกรายงาน
                            </Button>
                        </Space>
                    </Space>
                )}
            </Modal>
        </div>
    );
};

export default ReportsPage;