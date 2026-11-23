// Select the course cards and the My Courses container.
const search = document.getElementById("search");
const courses = document.querySelectorAll("#courseContainer .course-card");
const enrolledContainer = document.getElementById("enrolledContainer");

// Restore saved enrollments when the page loads.
let enrolled = JSON.parse(localStorage.getItem("myCourses") || "[]");

// Filter visible course cards when typing into the search box.
search.addEventListener("input", function() {
  let text = search.value.toLowerCase();

  courses.forEach(function(course) {
    let name = course.querySelector("h3").innerText.toLowerCase();

    if (name.includes(text)) {
      course.style.display = "block";
    } else {
      course.style.display = "none";
    }
  });
});

// Add a course to My Courses.
function enroll(courseName) {
  if (!enrolled.includes(courseName)) {
    enrolled.push(courseName);
    localStorage.setItem("myCourses", JSON.stringify(enrolled));
  }
  showMyCourses();
}

// Remove a course from My Courses.
function unenroll(courseName) {
  enrolled = enrolled.filter(function(name) {
    return name !== courseName;
  });
  localStorage.setItem("myCourses", JSON.stringify(enrolled));
  showMyCourses();
}

// Display saved courses and update the original Enroll buttons.
function showMyCourses() {
  enrolledContainer.innerHTML = "";

  enrolled.forEach(function(courseName) {
    const originalCourse = Array.from(courses).find(function(course) {
      return course.querySelector("h3").innerText === courseName;
    });

    if (originalCourse) {
      const card = originalCourse.cloneNode(true);
      const button = card.querySelector("button");
      button.innerText = "Unenroll";
      button.disabled = false;
      button.onclick = function() {
        unenroll(courseName);
      };
      enrolledContainer.appendChild(card);
    }
  });

  if (enrolled.length === 0) {
    enrolledContainer.innerHTML = "<p>You haven't enrolled in any courses yet.</p>";
  }

  courses.forEach(function(course) {
    const name = course.querySelector("h3").innerText;
    const button = course.querySelector("button");

    if (enrolled.includes(name)) {
      button.innerText = "Enrolled";
      button.disabled = true;
    } else {
      button.innerText = "Enroll Now";
      button.disabled = false;
    }
  });
}

showMyCourses();
