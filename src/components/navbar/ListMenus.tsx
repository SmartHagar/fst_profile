/** @format */
// navbar/ListMenus.tsx
import { MenuItem } from "@/types";
import {
  Activity,
  AsteriskSquareIcon,
  BookOpenText,
  GalleryHorizontal,
  LayoutDashboard,
  Newspaper,
  ServerIcon,
} from "lucide-react";

const ListMenu: MenuItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: <AsteriskSquareIcon />,
    children: [
      {
        name: "Sejarah & Visi Misi",
        href: "/profile/sejarah-visimisi",
      },
      {
        name: "Pimpinan FST",
        href: "/profile/pimpinan-fst",
      },
      {
        name: "Lokasi",
        href: "/profile/lokasi",
      },
    ],
  },
  {
    name: "Program Studi",
    href: "/prodi",
    icon: <BookOpenText />,
    children: [
      {
        name: "Sistem Informasi",
        href: "/prodi/sistem-informasi",
      },
      {
        name: "Geologi",
        href: "/prodi/geologi",
      },
      {
        name: "Biologi",
        href: "/prodi/biologi",
      },
      {
        name: "Laboratorium",
        href: "https://lab.fstuogp.com",
        blank: true,
      },
    ],
  },
  {
    name: "Galeri",
    href: "/galeri",
    icon: <GalleryHorizontal />,
    children: [
      {
        name: "Foto",
        href: "/galeri/foto",
      },
      {
        name: "Video",
        href: "/galeri/video",
      },
    ],
  },
  {
    name: "Berita & Pengumuman",
    icon: <Newspaper />,
    children: [
      {
        name: "Berita",
        href: "/berita",
      },
      {
        name: "Pengumuman",
        href: "/pengumuman",
      },
    ],
  },
  {
    name: "Layanan",
    href: "/layanan",
    icon: <ServerIcon />,
    children: [
      {
        name: "Kesehatan",
        href: "/layanan/kesehatan",
      },
      {
        name: "Survei Kepuasan",
        href: "/layanan/survei",
      },
      {
        name: "Dokumen",
        href: "/layanan/dokumen",
      },
    ],
  },
  {
    name: "Akademik",
    href: "/komunitas",
    icon: <Activity />,
    children: [
      {
        name: "Jadwal",
        href: "/akademik/jadwal",
      },
      {
        name: "Mahasiswa",
        href: "/akademik/mahasiswa",
      },
      {
        name: "Alumni",
        href: "https://alumni.fstuogp.com",
        blank: true,
      },
    ],
  },
];

export default ListMenu;
