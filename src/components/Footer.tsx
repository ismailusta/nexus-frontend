import { FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Nexus News. Tüm hakları saklıdır.
        </p>
        <div className="flex items-center gap-4">
          <a href="https://github.com/ismailusta" aria-label="GitHub"><FaGithub size={20} /></a>
          <a href="#" aria-label="YouTube"><FaYoutube size={20} /></a>
          <a href="#" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
        </div>
      </div>
    </footer>
  )
}