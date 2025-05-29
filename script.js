const calculateButton = document.getElementById("calculate-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("result-display");
const gpaButton = document.getElementById("gpa-button");
const cgpaButton = document.getElementById("cgpa-button");
const formulaButton = document.getElementById("formula-button");

const gradeArr = {
    S: 10, A: 9, B: 8, C: 7, D: 6, E: 5, F: 0, 0 : 0
};

const gpa = JSON.parse(localStorage.getItem('gpa')) || [];

const loadData = () => {
    const savedResults = JSON.parse(localStorage.getItem('gpa'));
    if (savedResults === null){
        for(let i = 1; i <= 12; i++){
            const creditElement = document.getElementById(`sub${i}-credit`);
            const gradeElement = document.getElementById(`sub${i}-grade`);
            creditElement.value = '';
            gradeElement.value = '';
        }
        return;
    }
    else{
        for(let i = 1; i <= 12; i++){
            const creditElement = document.getElementById(`sub${i}-credit`);
            const gradeElement = document.getElementById(`sub${i}-grade`);
            creditElement.value = savedResults[i - 1]?.creditValue || '';
            gradeElement.value = savedResults[i - 1]?.gradeValue || '';
        }
    }

}

const takeInputValues = () => {
    for(let i = 1; i <= 12; i++){
        const creditElement = document.getElementById(`sub${i}-credit`);
        const gradeElement = document.getElementById(`sub${i}-grade`);
        
        const creditValue = Number(creditElement?.value) || 0;
        const gradeValue = gradeElement?.value.toUpperCase() || 0;
        gpa.splice(i - 1, 1, { creditValue, gradeValue });
    }
    localStorage.setItem("gpa", JSON.stringify(gpa));
    return gpa;
}

const calculateCGPA = (gpa) => {
    let totalCredits = 0;
    let totalPoints = 0;

    gpa.forEach(({ creditValue, gradeValue }) => {
        const gradePoint = gradeArr[gradeValue] || 0;
        totalCredits += creditValue;
        totalPoints += creditValue * gradePoint;
    });

    return totalCredits > 0 ? (totalPoints / totalCredits).toFixed(2) : "0.00";
}

const clear = (gpa) => {
    localStorage.removeItem("gpa");
    gpa.length = 0; // Clear the results array
    loadData();
}

calculateButton?.addEventListener("click", () => {
    result.innerText  = `${calculateCGPA(takeInputValues())}`;
});

document.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        result.innerText = `${calculateCGPA(takeInputValues())}`;
    }
});

clearButton?.addEventListener("click", () => { clear(gpa); });

document.addEventListener("DOMContentLoaded", () => {loadData();});

document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  // Toggle sidebar when hamburger menu is clicked
  menuIcon.addEventListener('click', function() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  });

  // Close sidebar when overlay is clicked
  overlay.addEventListener('click', function() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  });

  // Close sidebar when pressing Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      sidebar.classList.remove('active');
      overlay.classList.remove('active');
    }
  });

  gpaButton?.addEventListener("click", () => {
    window.location.replace("index.html");
  });
  cgpaButton?.addEventListener("click", () => {
    window.location.replace("cgpa.html");
  });
  formulaButton?.addEventListener("click", () => {
    window.location.replace("formula.html");
  });
});




