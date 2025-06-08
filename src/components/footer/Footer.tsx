/** @format */

// components/Footer/FooterUpdated.tsx
import React from "react";
import Link from "next/link";
import Image from "next/image";
import {
  MapPin,
  Phone,
  Mail,
  Globe,
  Facebook,
  Instagram,
  Youtube,
  Twitter,
  Linkedin,
} from "lucide-react";
import BackToTopAdvanced from "./BackToTopAdvanced";

const FooterUpdated: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Tentang Fakultas",
      links: [
        { name: "Sejarah & Visi Misi", href: "/profile/sejarah-visimisi" },
        { name: "Lokasi", href: "/profile/lokasi" },
        { name: "Dashboard", href: "/dashboard" },
      ],
    },
    {
      title: "Program Studi",
      links: [
        { name: "Sistem Informasi", href: "/prodi/sistem-informasi" },
        { name: "Geologi", href: "/prodi/geologi" },
        { name: "Biologi", href: "/prodi/biologi" },
        { name: "Laboratorium", href: "/prodi/laboratorium" },
      ],
    },
    {
      title: "Informasi",
      links: [
        { name: "Berita", href: "/berita/list" },
        { name: "Pengumuman", href: "/pengumuman/list" },
        { name: "Galeri Foto", href: "/galeri/foto" },
        { name: "Galeri Video", href: "/galeri/video" },
      ],
    },
    {
      title: "Layanan",
      links: [
        { name: "Layanan Kesehatan", href: "/layanan/kesehatan" },
        { name: "Survei Kepuasan", href: "/layanan/survei" },
        { name: "Download Jadwal", href: "/download/jadwal" },
        { name: "Download Dokumen", href: "/download/dokumen" },
      ],
    },
    {
      title: "Komunitas",
      links: [
        { name: "Mahasiswa", href: "/komunitas/mahasiswa" },
        { name: "Alumni", href: "/komunitas/alumni" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      href: "https://facebook.com/fstuog",
      icon: <Facebook className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com/fstuog",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com/@fstuog",
      icon: <Youtube className="w-5 h-5" />,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/fstuog",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/school/fstuog",
      icon: <Linkedin className="w-5 h-5" />,
    },
  ];

  return (
    <>
      <footer className="bg-base-300 text-base-content">
        {/* Main Footer Content */}
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Institution Info */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4">
                <Image
                  src="/images/uogp.png"
                  alt="Logo UOG"
                  width={60}
                  height={60}
                  className="mr-3"
                />
                <div>
                  <h3 className="font-bold text-lg leading-tight">
                    Fakultas Sains & Teknologi
                  </h3>
                  <p className="text-sm text-base-content/70">
                    Universitas Ottow Geissler Papua
                  </p>
                </div>
              </div>

              <p className="text-sm text-base-content/80 mb-4 leading-relaxed">
                Membangun generasi unggul di bidang sains dan teknologi untuk
                kemajuan Papua dan Indonesia.
              </p>

              {/* Contact Info */}
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <MapPin className="w-4 h-4 mr-2 mt-0.5 text-primary flex-shrink-0" />
                  <span className="text-base-content/80">
                    Jln. Perkutut Kotaraja 99225 Jayapura
                  </span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                  <span className="text-base-content/80">+62 967 592 999</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                  <span className="text-base-content/80">fst@uog.ac.id</span>
                </div>
                <div className="flex items-center">
                  <Globe className="w-4 h-4 mr-2 text-primary flex-shrink-0" />
                  <span className="text-base-content/80">www.uog.ac.id</span>
                </div>
              </div>
            </div>

            {/* Menu Sections */}
            {footerSections.map((section, index) => (
              <div key={index} className="space-y-4">
                <h4 className="font-semibold text-base text-base-content">
                  {section.title}
                </h4>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        href={link.href}
                        className="text-sm text-base-content/80 hover:text-primary transition-colors duration-200"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Quick Links */}
          <div className="mt-12 pt-8 border-t border-base-content/10">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="mb-6 lg:mb-0">
                <h4 className="font-semibold mb-3">Tautan Penting</h4>
                <div className="flex flex-wrap gap-4 text-sm">
                  <Link
                    href="/download/jadwal"
                    className="hover:text-primary transition-colors"
                  >
                    Jadwal Kuliah
                  </Link>
                  <Link
                    href="/layanan/survei"
                    className="hover:text-primary transition-colors"
                  >
                    Survei Kepuasan
                  </Link>
                  <Link
                    href="/komunitas/alumni"
                    className="hover:text-primary transition-colors"
                  >
                    Jaringan Alumni
                  </Link>
                  <Link
                    href="/profile/lokasi"
                    className="hover:text-primary transition-colors"
                  >
                    Peta Kampus
                  </Link>
                </div>
              </div>

              {/* Social Media Links */}
              <div>
                <h4 className="font-semibold mb-3">Ikuti Kami</h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-circle btn-sm bg-base-100 border-base-content/20 hover:bg-primary hover:border-primary hover:text-primary-content transition-all duration-200"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-base-100 border-t border-base-content/10">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between text-sm text-base-content/70">
              <div className="mb-4 md:mb-0">
                <p>
                  © 2021 - {currentYear} Fakultas Sains & Teknologi, Universitas
                  Ottow Geissler Papua.
                  <span className="hidden sm:inline">
                    {" "}
                    Hak Cipta Dilindungi.
                  </span>
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/privacy"
                  className="hover:text-primary transition-colors"
                >
                  Kebijakan Privasi
                </Link>
                <Link
                  href="/terms"
                  className="hover:text-primary transition-colors"
                >
                  Syarat & Ketentuan
                </Link>
                <Link
                  href="/sitemap"
                  className="hover:text-primary transition-colors"
                >
                  Peta Situs
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button - Now separate component */}
      <BackToTopAdvanced
        showAfter={400}
        variant="circle"
        theme="primary"
        position="bottom-right"
        showProgress={true}
        animation="slide"
      />
    </>
  );
};

export default FooterUpdated;
