import { Link } from "react-router";

import { PageHelmet } from "@/components/seo/page-helmet";
import { paths } from "@/config/paths";

export const ProjectDetailsPage = () => {
  return (
    <>
      <PageHelmet
        title="Project Details | Electrozone"
        description="Discover the technologies, libraries and methods used in creating Electrozone."
      />
      <div className="page-spacing">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="mb-3 text-3xl font-bold text-gray-800">Electrozone E-Commerce Platform</h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A modern, full-stack e-commerce platform built with React and TypeScript, designed to
            provide a seamless shopping experience with comprehensive user and order management
            features.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Key Features</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div className="rounded-lg bg-blue-50 p-4 border border-blue-100">
              <h3 className="mb-2 font-semibold text-blue-800">User Management</h3>
              <p className="text-sm text-blue-700">
                Create and update user profiles with secure authentication
              </p>
            </div>
            <div className="rounded-lg bg-green-50 p-4 border border-green-100">
              <h3 className="mb-2 font-semibold text-green-800">Product Interaction</h3>
              <p className="text-sm text-green-700">
                Add products to basket and wishlist with real-time updates
              </p>
            </div>
            <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
              <h3 className="mb-2 font-semibold text-purple-800">Order Management</h3>
              <p className="text-sm text-purple-700">
                Checkout, track orders, and cancel within 24 hours
              </p>
            </div>
            <div className="rounded-lg bg-orange-50 p-4 border border-orange-100">
              <h3 className="mb-2 font-semibold text-orange-800">Trending Products</h3>
              <p className="text-sm text-orange-700">
                Display best sellers, top rated, and most wishlisted items
              </p>
            </div>
            <div className="rounded-lg bg-indigo-50 p-4 border border-indigo-100">
              <h3 className="mb-2 font-semibold text-indigo-800">Responsive Design</h3>
              <p className="text-sm text-indigo-700">
                Optimized for desktop and mobile experiences
              </p>
            </div>
            <div className="rounded-lg bg-teal-50 p-4 border border-teal-100">
              <h3 className="mb-2 font-semibold text-teal-800">Product Search & Filtering</h3>
              <p className="text-sm text-teal-700">
                Search functionality with brand & price & subcategory filtering
              </p>
            </div>
          </div>
        </div>

        {/* Technology Stack Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Technology Stack</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Frontend */}
            <div className="rounded-lg bg-gray-50 p-6 border border-gray-200">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Frontend</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Vite.js</strong> - Fast build tool and development server
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>TypeScript</strong> - Type-safe JavaScript development
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Redux Toolkit</strong> - Predictable state management
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>RTK Query</strong> - Efficient data fetching and caching
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>React Hook Form</strong> - Performant form management
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>Tailwind CSS & Material UI</strong> - Modern styling
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                  <strong>React Router Dom</strong> - Client-side routing
                </li>
              </ul>
            </div>

            {/* Backend */}
            <div className="rounded-lg bg-gray-50 p-6 border border-gray-200">
              <h3 className="mb-3 text-xl font-semibold text-gray-800">Backend & Database</h3>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>NestJS</strong> - Scalable Node.js framework
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>MySQL</strong> - Relational database
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>TypeORM</strong> - Database abstraction layer
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Passport</strong> - Authentication middleware
                </li>
                <li className="flex items-center text-gray-700">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                  <strong>Redis</strong> - Advanced caching with smart invalidation
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Repository Links Section */}
        <div className="mb-8">
          <h2 className="mb-4 text-2xl font-semibold text-gray-800">Source Code</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://github.com/KutayAraz/electrozone-client"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg bg-gray-900 text-white px-6 py-3 hover:bg-gray-800 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Frontend Repository
            </a>
            <a
              href="https://github.com/KutayAraz/electrozone-server"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center rounded-lg bg-gray-700 text-white px-6 py-3 hover:bg-gray-600 transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z"
                  clipRule="evenodd"
                />
              </svg>
              Backend Repository
            </a>
          </div>
        </div>

        {/* Contact Section */}
        <div className="rounded-lg bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border border-blue-100">
          <h2 className="mb-3 text-2xl font-semibold text-gray-800">Get In Touch</h2>
          <p className="text-gray-600 mb-4">
            Thank you for exploring Electrozone! If you have any questions about the project or
            would like to connect, feel free to reach out.
          </p>
          <div className="flex items-center text-blue-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <Link to={paths.misc.contact.getHref()} className="hover:underline font-medium">
              Contact page
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
