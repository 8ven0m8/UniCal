const calculateButton = document.getElementById("calculate-btn");
const clearButton = document.getElementById("clear-btn");
const result = document.getElementById("result-display");
const gpaButton = document.getElementById("gpa-button");
const cgpaButton = document.getElementById("cgpa-button");
const formulaButton = document.getElementById("formula-button");

const cgpa = JSON.parse(localStorage.getItem('cgpa')) || [];

const loadData = () => {
    const savedResults = JSON.parse(localStorage.getItem('cgpa'));
    if (savedResults === null){
        for(let i = 1; i <= 12; i++){
            const gpaElement = document.getElementById(`sem${i}-gpa`);
            const creditElement = document.getElementById(`sem${i}-credit`);
            gpaElement.value = '';
            creditElement.value = '';
        }
        return;
    }
    else{
        for(let i = 1; i <= 12; i++){
            const gpaElement = document.getElementById(`sem${i}-gpa`);
            const creditElement = document.getElementById(`sem${i}-credit`);
            gpaElement.value = savedResults[i - 1]?.gpaValue || '';
            creditElement.value = savedResults[i - 1]?.creditValue || '';
        }
    }

}

const takeInputValues = () => {
    for(let i = 1; i <= 12; i++){
        const gpaElement = document.getElementById(`sem${i}-gpa`);
        const creditElement = document.getElementById(`sem${i}-credit`);
        
        const gpaValue = Number(gpaElement?.value) || 0;
        const creditValue = Number(creditElement?.value) || 0;
        cgpa.splice(i - 1, 1, { gpaValue, creditValue });
    }
    localStorage.setItem("cgpa", JSON.stringify(cgpa));
    return cgpa;
}

const calculateCGPA = (cgpa) => {
    let totalGPA = 0;
    let totalCredit = 0;

    cgpa.forEach(({ gpaValue, creditValue }) => {
        totalGPA += gpaValue * creditValue;
        totalCredit += creditValue;
    });

    return totalCredit > 0 ? (totalGPA / totalCredit).toFixed(2) : "0.00";
}

const clear = (results2) => {
    localStorage.removeItem("cgpa");
    cgpa.length = 0; // Clear the results array
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

clearButton?.addEventListener("click", () => { clear(cgpa); });

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




