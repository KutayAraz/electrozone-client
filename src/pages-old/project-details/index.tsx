export const ProjectDetails = () => {
  return (
    <div className="page-spacing">
      <h4 className="text-lg font-[500] text-gray-700">
        Thank you for visiting electrozone.com! Below you can find the tools used to create this
        project.
      </h4>
      <ul className="ml-4 mt-2 flex list-disc flex-col space-y-[4px] xs:ml-[2%]">
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
