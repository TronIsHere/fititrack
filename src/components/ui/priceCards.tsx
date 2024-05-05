import Link from "next/link";

const PriceCards = () => {
  const paymentLink = "https://buy.stripe.com/test_00g8zY6hBgsk8IU000";
  return (
    <div className="">
      <div className="relative max-w-7xl mx-auto">
        <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
          <div className="flex-1 px-6 py-8 lg:p-12 bg-gray-600">
            <h3 className="text-2xl font-extrabold text-white sm:text-3xl">
              Lifetime access
            </h3>
            <p className="mt-6 text-base text-gray-50 sm:text-lg">
              We believe that Users should have access to the tools they need to
              track their fitness and health. That&apos;s why we offer a
              lifetime access to our app.
            </p>
            <div className="mt-8">
              <div className="flex items-center">
                <div className="flex-1 border-t-2 border-gray-200"></div>
              </div>
              <ul
                role="list"
                className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
              >
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Tracking Your Journey</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">Available Every Where</p>
                </li>
                <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">
                    100% Refund if you are not satisfied.
                  </p>
                </li>
                {/* <li className="flex items-start lg:col-span-1">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-5 w-5 text-green-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  <p className="ml-3 text-white">
                    Free Chrome extension updates (Firefox coming soon)
                  </p>
                </li> */}
              </ul>
            </div>
          </div>
          <div className="py-8 px-6 text-center lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12 bg-gray-700">
            <p className="text-lg leading-6 font-medium text-white">
              Pay once, own it forever
            </p>
            <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-white">
              <span>$10.99</span>
              <span className="ml-3 text-xl font-medium text-gray-50">USD</span>
            </div>
            <div className="mt-6">
              <div className="rounded-md shadow">
                <Link
                  href={"/login"}
                  className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-600"
                >
                  Buy now
                </Link>
              </div>
              <p className="text-gray-300 text-sm mt-3">
                100% money back guarantee - 5 days free trial
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriceCards;
