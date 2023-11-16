const ProjectDetails = () => {
  return (
    <div className="max-w-screen-lg mx-2 xs:mx-[2%] mt-2">
      <h4 className="text-lg text-gray-700 font-semibold">Thank you for visiting electrozone.com! Below you can find the tools used to create this project.</h4>
      <ul className="flex flex-col space-y-[4px] mt-2 list-disc ml-4 xs:ml-[2%]">
        <li>This project is built with Vite.js and Typescript.</li>
        <li>State is managed with Redux.</li>
        <li>Form inputs are controlled with react-hook-form.</li>
        <li>Tailwind CSS and Material UI is used for styling.</li>
        <li>NestJS is used to create the backend API.</li>
        <li>MySQL is used as database and hosted with Azure.</li>
        <li>Passport is used as middleware.</li>
        <li>TypeORM is used to link MySQL database to NestJS application.</li>
      </ul>
    </div>
  );
};

export default ProjectDetails;
