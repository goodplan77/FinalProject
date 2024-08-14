import { useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import styles from './css/CalendarPage.module.css';

type Value = Date | null | [Date | null, Date | null];

export default function CalendarPage() {
    const today = new Date();
    const [date, setDate] = useState<Value>(today);
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [memo, setMemo] = useState("");
    const [time, setTime] = useState(""); // 시간 입력을 위한 state 추가
    const attendDay = ["2023-12-03", "2023-12-13"];

    const handleDateChange = (newDate: Value) => {
        if (newDate instanceof Date) {
            setDate(newDate);
            setSelectedDate(newDate);
            setShowModal(true);  // 날짜 클릭 시 모달 창을 띄움
        } else if (Array.isArray(newDate) && newDate[0] instanceof Date) {
            setDate(newDate[0]);
            setSelectedDate(newDate[0]);
            setShowModal(true);  // 날짜 클릭 시 모달 창을 띄움
        }
    };

    const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTime(e.target.value);
    };

    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value);
    };

    const handleMemoSave = () => {
        console.log(`Memo saved for ${format(selectedDate as Date, 'yyyy/MM/dd')} at ${time}: ${memo}`);
        setShowModal(false);
        setMemo("");
        setTime(""); // 저장 후 시간 초기화
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMemo("");
        setTime(""); // 모달 닫을 때 시간 초기화
    };

    const handleDeleteClick = (item: string) => {
        console.log(`${item} has been deleted.`);
    };

    return (
        <div className={styles.pageContainer}>
            <div className={styles.calendarHeader}>캘린더 - 메모</div>
            <div className={styles.calendarContainer}>
                <div className={styles.reactCalendarWrapper}>
                    <Calendar
                        className={styles.reactCalendar}
                        value={date}
                        onChange={handleDateChange}
                        formatDay={(locale, date) => format(date, 'd')}
                        formatYear={(locale, date) => format(date, 'yyyy')}
                        formatMonthYear={(locale, date) => format(date, 'yyyy. MM')}
                        calendarType="gregory"
                        showNeighboringMonth={false}
                        next2Label={null}
                        prev2Label={null}
                        activeStartDate={activeStartDate === null ? undefined : activeStartDate}
                        onActiveStartDateChange={({ activeStartDate }) =>
                            setActiveStartDate(activeStartDate)
                        }
                        tileClassName={({ date, view }) =>
                            view === "month" && attendDay.includes(format(date, 'yyyy-MM-dd')) ? styles.attendDayHighlight : null
                        }
                    />
                </div>
            </div>
            <div className={styles.memoContainer}>
                <div className={styles.memoList}>
                    <div className={styles.memoItem}>
                        <div className={styles.memoTitle}>초코 병원 가야하는 날</div>
                        <div className={styles.memoTime}>2024/09/20 오후 1:00</div>
                        <button className={styles.deleteButton} onClick={() => handleDeleteClick("초코 병원 가야하는 날")}>
                            삭제
                        </button>
                    </div>
                </div>
            </div>
            {showModal && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContent}>
                        <div>메모</div>
                        <h2>{format(selectedDate as Date, 'yyyy/MM/dd')}</h2>

                        {/* 시간 입력 필드 추가 */}
                        <input
                            type="time"
                            value={time}
                            onChange={handleTimeChange}
                            className={styles.timeInput}
                        />

                        <textarea
                            value={memo}
                            onChange={handleMemoChange}
                            placeholder="메모를 입력하세요"
                        />
                        <button onClick={handleMemoSave}>저장</button>
                        <button onClick={handleCloseModal}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}
