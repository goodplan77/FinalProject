import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import 'react-calendar/dist/Calendar.css';
import { format } from 'date-fns';
import styles from './css/CalendarPage.module.css';
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useDispatch } from "react-redux";
import { selectedMemo } from "../features/memoSlice";

type Value = Date | null | [Date | null, Date | null];

export default function CalendarPage() {
    const dispatch = useDispatch();
    const today = new Date();
    const [date, setDate] = useState<Value>(today);
    const [activeStartDate, setActiveStartDate] = useState<Date | null>(new Date());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState<Date | null>(null);
    const [memo, setMemo] = useState("");
    const [time, setTime] = useState(""); // 시간 입력을 위한 state 추가
    const attendDay = ["2023-12-03", "2023-12-13"];
    const loginUser = useSelector((state: RootState) => state.user);

    const memos = useSelector((state: RootState) => state.memos);

    useEffect(() => {
        axios.get("http://localhost:8013/banju/calendarPage/memoList")
            .then((response) => {
                console.log(response);
                dispatch(selectedMemo(response.data));
            })
            .catch((response) => {
                console.log(response);
            })
    }, [dispatch]);

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
        const inputTime = e.target.value; // "HH:mm" 형식으로 입력
        const formattedTime = `${inputTime}:00`; // "HH:mm:ss" 형식으로 변환
        setTime(formattedTime);
    };

    const handleMemoChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setMemo(e.target.value);
    };

    const handleMemoSave = () => {
        if (!selectedDate || !time) {
            alert("날짜와 시간을 입력하세요.");
            return;
        }

        // 날짜와 시간을 결합하여 'yyyy-MM-dd HH:mm:ss' 형식의 문자열 생성
        const targetDateString = `${format(selectedDate as Date, 'yyyy-MM-dd')} ${time}`;

        const memoData = {
            targetDate: targetDateString, // 'yyyy-MM-dd HH:mm:ss' 형식의 문자열
            content: memo,
            userNo: loginUser.userNo
        };

        axios.post('http://localhost:8013/banju/calendarPage/insertMemo', memoData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then((response) => {
                console.log(response);
                axios.get("http://localhost:8013/banju/calendarPage/memoList")
                    .then((response) => {
                        console.log(response);
                        dispatch(selectedMemo(response.data));
                    })
                    .catch((response) => {
                        console.log(response);
                    })
            })
            .catch((error) => {
                console.log(error);
            });

        setShowModal(false);
        setMemo("");
        setTime("");
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setMemo("");
        setTime(""); // 모달 닫을 때 시간 초기화
    };

    const deleteMemo = (memoNo: number) => {
        axios.delete('http://localhost:8013/banju/calendarPage/deleteMemo/' + memoNo)
            .then((response) => {
                alert(response.data);
                axios.get("http://localhost:8013/banju/calendarPage/memoList")
                    .then((response) => {
                        console.log(response);
                        dispatch(selectedMemo(response.data));
                    })
                    .catch((response) => {
                        console.log(response);
                    })
            })
            .catch((error) => {
                console.log(error);
            });

    };

    const tileContent = ({ date, view }: { date: Date; view: string }) => {
        if (view === 'month') {
            const memoForDate = memos.find(memo =>
                format(new Date(memo.targetDate), 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')
            );
            if (memoForDate) {
                return <div className={styles.dot}></div>;
            }
        }
        return null;
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
                        tileContent={tileContent} // 추가된 부분: 메모가 있는 날짜에 노란 점 표시
                    />
                </div>
            </div>
            <div className={styles.memoContainer}>
                <div className={styles.memoList}>
                    {
                        memos.map((memo) => {
                            return (
                                <div className={styles.memoItem} key={memo.memoNo}>
                                    <div className={styles.memoTitle}>{memo.content}</div>
                                    <div className={styles.memoTime}>{format(new Date(memo.targetDate), 'yyyy-MM-dd HH:mm')}</div>
                                    <button className={styles.deleteButton} onClick={() => deleteMemo(memo.memoNo)}>
                                        삭제
                                    </button>
                                </div>
                            )
                        })
                    }
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
