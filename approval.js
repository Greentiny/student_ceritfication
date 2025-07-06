
window.addEventListener('DOMContentLoaded', function () {
    const name = sessionStorage.getItem('studentName') || '이윤아';
    const grade = sessionStorage.getItem('grade') || '';
    const classNum = sessionStorage.getItem('classNum') || '';
    const studentNum = sessionStorage.getItem('studentNum') || '';

    // 이름 출력
    const nameEl = document.querySelector('.student-name');
    if (nameEl) nameEl.textContent = name;

    // 학년/반/번호 출력
    const gradeEl = document.getElementById('grade-number');
    if (gradeEl && grade) gradeEl.textContent = `${grade}학년`;

    const classEl = document.getElementById('class-number');
    if (classEl && classNum) classEl.textContent = `${classNum}반`;

    const numEl = document.getElementById('student-number');
    if (numEl && studentNum) numEl.textContent = `${studentNum}번`;

    // 승인 메시지
    const statusMsg = document.querySelector('.status-text p');
    if (statusMsg && grade) {
        statusMsg.textContent = `${grade}학년 학생으로 인증되었습니다.`;
    }

    // 학과 이미지 표시
    showDepartmentImage(classNum);
});

function parseStudentId(studentId) {
    if (!/^[0-9]{5}$/.test(studentId)) {
        return { error: '학번은 5자리 숫자로 입력해주세요.' };
    }
    const grade = Number(studentId[0]);
    const classNum = studentId.slice(1, 3);
    const studentNum = studentId.slice(3); // 앞자리 0 유지 위해 문자열 그대로

    if (![1, 2, 3].includes(grade)) {
        return { error: '유효하지 않은 학년입니다.' };
    }
    if (!['01', '02', '03', '04', '05', '06', '07', '08'].includes(classNum)) {
        return { error: '반 번호는 01~08 사이여야 합니다.' };
    }

    return { grade, classNum, studentNum };
}

function redirectToApprovalPage(studentId) {
    const parsed = parseStudentId(studentId);
    if (parsed.error) {
        alert(parsed.error);
        return;
    }

    sessionStorage.setItem('studentName', '이윤아');
    sessionStorage.setItem('grade', parsed.grade);
    sessionStorage.setItem('classNum', parsed.classNum);
    sessionStorage.setItem('studentNum', parsed.studentNum);
    location.href = `grade${parsed.grade}.html`;
}

// index.html에서 실행
document.getElementById('verify-btn').onclick = function () {
    const studentId = document.getElementById('student-id').value.trim();
    redirectToApprovalPage(studentId);
};

document.getElementById('student-id').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        redirectToApprovalPage(e.target.value.trim());
    }
});

// 학과 이미지 표시
function showDepartmentImage(classNum) {
    const imgClasses = ['.laptop-img', '.robot-img', '.반도체-img', '.pallete-img'];
    imgClasses.forEach(cls => {
        const el = document.querySelector(cls);
        if (el) el.style.display = 'none';
    });

    let showClass = '';
    if (classNum === '01' || classNum === '02') showClass = '.반도체-img';
    else if (classNum === '03' || classNum === '04') showClass = '.robot-img';
    else if (classNum === '05' || classNum === '06') showClass = '.pallete-img';
    else if (classNum === '07' || classNum === '08') showClass = '.laptop-img';

    if (showClass) {
        const el = document.querySelector(showClass);
        if (el) el.style.display = 'block';
    }
}
