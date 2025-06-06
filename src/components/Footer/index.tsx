import { CallIcon, EmailIcon, MapIcon } from '@/assets/icons';
import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from '@/assets/icons/social';
import Link from 'next/link';
import AccountLinks from './AccountLinks';
import FooterBottom from './FooterBottom';
import { AppStoreIcon, GooglePlayIcon } from './icons';
import QuickLinks from './QuickLinks';

const Footer = () => {


  return (
    <footer className="overflow-hidden">
      <div className="max-w-[1170px] mx-auto px-4 sm:px-8 xl:px-0">
        {/* <!-- footer menu start --> */}
        <div className="flex flex-wrap xl:flex-nowrap gap-10 xl:gap-19 xl:justify-between pt-17.5 xl:pt-22.5 pb-10 xl:pb-15">
          <div className="max-w-[330px] w-full">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark">
              Help & Support
            </h2>

            <ul className="flex flex-col gap-3">
              <li className="flex gap-4.5">
                <span className="shrink-0">
                  <MapIcon className="fill-blue" width={24} height={24} />
                </span>
                685 Market Street,Las Vegas, LA 95820,United States.
              </li>

              <li>
                <Link
                  href="tel:+099 532-786-9843"
                  className="flex items-center gap-4.5"
                >
                  <CallIcon className="fill-blue" width={24} height={24} />
                  (+099) 532-786-9843
                </Link>
              </li>

              <li>
                <Link
                  href="mailto:support@example.com"
                  className="flex items-center gap-4.5"
                >
                  <EmailIcon className="fill-blue" width={24} height={24} />
                  support@example.com
                </Link>
              </li>
            </ul>

            {/* <!-- Social Links start --> */}
            <div className="flex items-center gap-4 mt-7.5">
              <Link
                href="#"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <span className="sr-only">Facebook link</span>
                <FacebookIcon />
              </Link>

              <Link
                href="#"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <span className="sr-only">Twitter link</span>
                <TwitterIcon />
              </Link>

              <Link
                href="#"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <span className="sr-only">Instagram link</span>
                <InstagramIcon />
              </Link>

              <Link
                href="#"
                aria-label="Linkedin Social Link"
                className="flex ease-out duration-200 hover:text-blue"
              >
                <span className="sr-only">LinkedIn link</span>
                <LinkedInIcon />
              </Link>
            </div>
            {/* <!-- Social Links end --> */}
          </div>

          <AccountLinks />

          <QuickLinks />

          <div className="w-full sm:w-auto">
            <h2 className="mb-7.5 text-custom-1 font-medium text-dark lg:text-right">
              Download App
            </h2>

            <p className="lg:text-right text-custom-sm mb-4">
              Save $3 With App & New User only
            </p>

            <ul className="flex flex-col lg:items-end gap-3">
              <li>
                <Link
                  className="inline-flex items-center gap-3 py-[9px] pl-4 pr-7.5 text-white rounded-md bg-dark ease-out duration-200 hover:bg-opacity-95"
                  href="#"
                >
                  <AppStoreIcon />

                  <div>
                    <span className="block text-custom-xs">
                      Download on the
                    </span>
                    <p className="font-medium">App Store</p>
                  </div>
                </Link>
              </li>

              <li>
                <Link
                  className="inline-flex items-center gap-3 py-[9px] pl-4 pr-8.5 text-white rounded-md bg-blue ease-out duration-200 hover:bg-opacity-95"
                  href="#"
                >
                  <GooglePlayIcon />

                  <div>
                    <span className="block text-custom-xs"> Get in On </span>
                    <p className="font-medium">Google Play</p>
                  </div>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <!-- footer menu end --> */}
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
