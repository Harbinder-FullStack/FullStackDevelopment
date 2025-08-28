export default function SubjectList() {
  const subjects = ["CC", "FSD", "ADBMS"];
  
  return (
    <div className="list-item-container">
      <h2>Subject List</h2>
      <ul>
        {
          subjects.map (
              (subject, index) => (<li key={index}>{subject}</li>)
          )
        }
      </ul>
    </div>
  );
}
