
import React from 'react';
import "./report .css"



const Reportpage: React.FC = () => {
    return (
        <div className='report-overlay'>
        <div className="safety-report-container">
            <div className="safety-report-header">
                <h2 className="title">รายงานความปลอดภัย</h2>
                <span className="exclamation-icon">!</span>
            </div>
            <form className="safety-report-form">
                <div className="form-group">
                    <label htmlFor="eventName" className="label">
                        ชื่อเหตุการณ์
                    </label>
                    <input type="text" id="eventName" className="input-field" />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="location" className="label">
                            สถานที่
                        </label>
                        <input type="text" id="location" className="input-field" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date" className="label">
                            วันที่
                        </label>
                        <input type="date" id="date" className="input-field" />
                    </div>

                    <div className="form-group">
                        <label htmlFor="time" className="label">
                            เวลา
                        </label>
                        <input type="time" id="time" className="input-field" />
                    </div>
                </div>

                <div className="form-group description-group">
                    <label  className="label">
                        รายละเอียด
                    </label>
                    <textarea
                        id="description"
                        className="textarea-field"
                        rows={5}
                        defaultValue="eee"
                    ></textarea>
                </div>

                <button type="submit" className="submit-button">
                    ยืนยันบันทึก
                </button>
            </form>
        </div>
    </div>
    );
};

export default Reportpage;