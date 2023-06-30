export const navLinks = [
    {
        id: 1,
        title: "Dashboard",
        link: "/",
        icon: 'bx bxs-dashboard',
        role: ['super-admin', 'admin', 'teacher']
    },
    {
        id: 2,
        title: "O'qituvchilar",
        link: "/teacher",
        icon: "bx bx-user-pin",
        role: ['super-admin', 'admin', 'teacher']
    },
    {
        id: 3,
        title: "O'quvchilar",
        link: "/student",
        icon: "bx bxs-layer-plus",
        role: ['super-admin', 'admin', 'teacher']
    },
    {
        id: 4,
        title: "Guruhlar",
        link: "/group",
        icon: "bx bx-calendar-alt",
        role: ['super-admin', 'admin', 'teacher', 'student']
    },
    {
        id: 5,
        title: "Fanlar",
        link: "/subject",
        icon: "bx bx-book-open",
        role: ['super-admin', 'admin', 'teacher', 'student']
    },
    {
        id: 6,
        title: "Testlar",
        link: "/test",
        icon: "bx bxs-hourglass",
        role: ['super-admin', 'admin', 'teacher', 'student']

    },
    {
        id: 7,
        title: "Natijalar",
        link: "/result",
        icon: "bx bxs-pie-chart-alt-2",
        role: ['super-admin', 'admin', 'teacher', 'student']

    }
]
