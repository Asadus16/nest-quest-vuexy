module.exports = [
"[project]/src/fake-db/pages/userProfile.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Type Imports
__turbopack_context__.s([
    "db",
    ()=>db
]);
const db = {
    users: {
        profile: {
            about: [
                {
                    property: 'Full Name',
                    value: 'John Doe',
                    icon: 'tabler-user'
                },
                {
                    property: 'Status',
                    value: 'active',
                    icon: 'tabler-check'
                },
                {
                    property: 'Role',
                    value: 'Developer',
                    icon: 'tabler-crown'
                },
                {
                    property: 'Country',
                    value: 'USA',
                    icon: 'tabler-flag'
                },
                {
                    property: 'Language',
                    value: 'English',
                    icon: 'tabler-language'
                }
            ],
            contacts: [
                {
                    property: 'Contact',
                    value: '(123) 456-7890',
                    icon: 'tabler-phone-call'
                },
                {
                    property: 'Skype',
                    value: 'john.doe',
                    icon: 'tabler-messages'
                },
                {
                    property: 'Email',
                    value: 'john.doe@example.com',
                    icon: 'tabler-mail'
                }
            ],
            teams: [
                {
                    property: 'Backend Developer',
                    value: '(126 Members)'
                },
                {
                    property: 'React Developer',
                    value: '(98 Members)'
                }
            ],
            overview: [
                {
                    property: 'Task Compiled',
                    value: '13.5k',
                    icon: 'tabler-check'
                },
                {
                    property: 'Connections',
                    value: '897',
                    icon: 'tabler-users'
                },
                {
                    property: 'Projects Compiled',
                    value: '146',
                    icon: 'tabler-layout-grid'
                }
            ],
            connections: [
                {
                    isFriend: true,
                    connections: '45',
                    name: 'Cecilia Payne',
                    avatar: '/images/avatars/2.png'
                },
                {
                    isFriend: false,
                    connections: '1.32k',
                    name: 'Curtis Fletcher',
                    avatar: '/images/avatars/3.png'
                },
                {
                    isFriend: false,
                    connections: '125',
                    name: 'Alice Stone',
                    avatar: '/images/avatars/4.png'
                },
                {
                    isFriend: true,
                    connections: '456',
                    name: 'Darrell Barnes',
                    avatar: '/images/avatars/5.png'
                },
                {
                    isFriend: true,
                    connections: '1.2k',
                    name: 'Eugenia Moore',
                    avatar: '/images/avatars/8.png'
                }
            ],
            teamsTech: [
                {
                    members: 72,
                    ChipColor: 'error',
                    chipText: 'Developer',
                    title: 'React Developers',
                    avatar: '/images/logos/react-bg.png'
                },
                {
                    members: 122,
                    chipText: 'Support',
                    ChipColor: 'primary',
                    title: 'Support Team',
                    avatar: '/images/icons/support-bg.png'
                },
                {
                    members: 7,
                    ChipColor: 'info',
                    chipText: 'Designer',
                    title: 'UI Designer',
                    avatar: '/images/logos/figma-bg.png'
                },
                {
                    members: 289,
                    ChipColor: 'error',
                    chipText: 'Developer',
                    title: 'Vue.js Developers',
                    avatar: '/images/logos/vue-bg.png'
                },
                {
                    members: 24,
                    chipText: 'Marketing',
                    ChipColor: 'secondary',
                    title: 'Digital Marketing',
                    avatar: '/images/logos/twitter-bg.png'
                }
            ],
            projectTable: [
                {
                    id: 1,
                    title: 'BGC eCommerce App',
                    subtitle: 'React Project',
                    leader: 'Eileen',
                    avatar: '/images/logos/react-bg.png',
                    avatarGroup: [
                        '/images/avatars/1.png',
                        '/images/avatars/2.png',
                        '/images/avatars/3.png',
                        '/images/avatars/4.png'
                    ],
                    status: 78
                },
                {
                    id: 2,
                    leader: 'Owen',
                    title: 'Falcon Logo Design',
                    subtitle: 'Figma Project',
                    avatar: '/images/logos/figma-bg.png',
                    avatarGroup: [
                        '/images/avatars/5.png',
                        '/images/avatars/6.png'
                    ],
                    status: 18
                },
                {
                    id: 3,
                    title: 'Dashboard Design',
                    subtitle: 'VueJs Project',
                    leader: 'Keith',
                    avatar: '/images/logos/vue-bg.png',
                    avatarGroup: [
                        '/images/avatars/7.png',
                        '/images/avatars/8.png',
                        '/images/avatars/1.png',
                        '/images/avatars/2.png'
                    ],
                    status: 62
                },
                {
                    id: 4,
                    title: 'Foodista Mobile App',
                    subtitle: 'Xamarin Project',
                    leader: 'Merline',
                    avatar: '/images/icons/mobile-bg.png',
                    avatarGroup: [
                        '/images/avatars/3.png',
                        '/images/avatars/4.png',
                        '/images/avatars/5.png',
                        '/images/avatars/6.png'
                    ],
                    status: 8
                },
                {
                    id: 5,
                    leader: 'Harmonia',
                    title: 'Dojo React Project',
                    subtitle: 'Python Project',
                    avatar: '/images/logos/python-bg.png',
                    avatarGroup: [
                        '/images/avatars/7.png',
                        '/images/avatars/8.png',
                        '/images/avatars/1.png'
                    ],
                    status: 36
                },
                {
                    id: 6,
                    leader: 'Allyson',
                    title: 'Blockchain Website',
                    subtitle: 'Sketch Project',
                    avatar: '/images/logos/sketch-bg.png',
                    avatarGroup: [
                        '/images/avatars/2.png',
                        '/images/avatars/3.png',
                        '/images/avatars/4.png',
                        '/images/avatars/5.png'
                    ],
                    status: 92
                },
                {
                    id: 7,
                    title: 'Hoffman Website',
                    subtitle: 'HTML Project',
                    leader: 'Georgie',
                    avatar: '/images/logos/html-bg.png',
                    avatarGroup: [
                        '/images/avatars/6.png',
                        '/images/avatars/7.png',
                        '/images/avatars/8.png',
                        '/images/avatars/1.png'
                    ],
                    status: 88
                },
                {
                    id: 8,
                    title: 'eCommerce Website',
                    subtitle: 'React Project',
                    leader: 'Eileen',
                    avatar: '/images/logos/react-bg.png',
                    avatarGroup: [
                        '/images/avatars/1.png',
                        '/images/avatars/2.png',
                        '/images/avatars/3.png',
                        '/images/avatars/4.png'
                    ],
                    status: 78
                },
                {
                    id: 9,
                    leader: 'Owen',
                    title: 'Retro Logo Design',
                    subtitle: 'Figma Project',
                    avatar: '/images/logos/figma-bg.png',
                    avatarGroup: [
                        '/images/avatars/5.png',
                        '/images/avatars/6.png'
                    ],
                    status: 18
                },
                {
                    id: 10,
                    title: 'Admin Dashboard',
                    subtitle: 'VueJs Project',
                    leader: 'Keith',
                    avatar: '/images/logos/vue-bg.png',
                    avatarGroup: [
                        '/images/avatars/7.png',
                        '/images/avatars/8.png',
                        '/images/avatars/1.png',
                        '/images/avatars/2.png'
                    ],
                    status: 62
                }
            ]
        },
        teams: [
            {
                extraMembers: 9,
                title: 'React Developers',
                avatar: '/images/logos/react-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Vinnie Mostowy'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Allen Rieske'
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Julee Rossignol'
                    }
                ],
                description: 'We don’t make assumptions about the rest of your technology stack, so you can develop new features.',
                chips: [
                    {
                        title: 'React',
                        color: 'primary'
                    },
                    {
                        title: 'MUI',
                        color: 'info'
                    }
                ]
            },
            {
                extraMembers: 4,
                title: 'Vue.js Dev Team',
                avatar: '/images/logos/vue-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: "Kaith D'souza"
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'John Doe'
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Alan Walker'
                    }
                ],
                description: 'The development of Vue and its ecosystem is guided by an international team, some of whom have chosen.',
                chips: [
                    {
                        title: 'Vuejs',
                        color: 'success'
                    },
                    {
                        color: 'error',
                        title: 'Developer'
                    }
                ]
            },
            {
                title: 'Creative Designers',
                avatar: '/images/logos/xd-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Jimmy Ressula'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Kristi Lawker'
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Danny Paul'
                    }
                ],
                description: 'A design or product team is more than just the people on it. A team includes the people, the roles they play.',
                chips: [
                    {
                        title: 'Sketch',
                        color: 'warning'
                    },
                    {
                        title: 'XD',
                        color: 'error'
                    }
                ]
            },
            {
                title: 'Support Team',
                avatar: '/images/icons/support-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'Andrew Tye'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'Rishi Swaat'
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Rossie Kim'
                    }
                ],
                description: 'Support your team. Your customer support team is fielding the good, the bad, and the ugly on daily basis.',
                chips: [
                    {
                        title: 'Zendesk',
                        color: 'info'
                    }
                ]
            },
            {
                extraMembers: 7,
                title: 'Digital Marketing',
                avatar: '/images/icons/social-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Kim Merchent'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: "Sam D'souza"
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Nurvi Karlos'
                    }
                ],
                description: 'Digital marketing refers to advertising delivered through digital channels such as search engines, websites…',
                chips: [
                    {
                        title: 'Twitter',
                        color: 'primary'
                    },
                    {
                        color: 'success',
                        title: 'Email'
                    }
                ]
            },
            {
                extraMembers: 2,
                title: 'Event',
                avatar: '/images/logos/event-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'Vinnie Mostowy'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'Allen Rieske'
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Julee Rossignol'
                    }
                ],
                description: 'Event is defined as a particular contest which is part of a program of contests. An example of an event is the long…',
                chips: [
                    {
                        title: 'Hubilo',
                        color: 'success'
                    }
                ]
            },
            {
                title: 'Figma Resources',
                avatar: '/images/logos/figma-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Andrew Mostowy'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Micky Ressula'
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Michel Pal'
                    }
                ],
                description: 'Explore, install, use, and remix thousands of plugins and files published to the Figma Community by designers.',
                chips: [
                    {
                        title: 'UI/UX',
                        color: 'success'
                    },
                    {
                        title: 'Figma',
                        color: 'warning'
                    }
                ]
            },
            {
                extraMembers: 8,
                title: 'Only Beginners',
                avatar: '/images/logos/html-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'Kim Karlos'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'Katy Turner'
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Peter Adward'
                    }
                ],
                description: 'Learn the basics of how websites work, front-end vs back-end. Learn basic HTML, CSS, and JavaScript.',
                chips: [
                    {
                        title: 'CSS',
                        color: 'info'
                    },
                    {
                        title: 'HTML',
                        color: 'primary'
                    }
                ]
            },
            {
                title: 'Python Developers',
                avatar: '/images/logos/python-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'Kim Karlos'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'Katy Turner'
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Peter Adward'
                    }
                ],
                description: "Harness Python's versatility for web development, data analysis & system automation for cutting-edge solutions.",
                chips: [
                    {
                        title: 'Python',
                        color: 'info'
                    }
                ]
            }
        ],
        projects: [
            {
                daysLeft: 28,
                comments: 15,
                totalTask: 344,
                hours: '380/244',
                tasks: '290/344',
                budget: '$18.2k',
                completedTask: 328,
                deadline: '28/2/22',
                chipColor: 'success',
                startDate: '14/2/21',
                budgetSpent: '$24.8k',
                members: '280 members',
                title: 'Social Banners',
                client: 'Christian Jimenez',
                avatar: '/images/icons/social-bg.png',
                description: 'We are Consulting, Software Development and Web Development Services.',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Vinnie Mostowy'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Allen Rieske'
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Julee Rossignol'
                    }
                ]
            },
            {
                daysLeft: 15,
                comments: 236,
                totalTask: 90,
                tasks: '12/90',
                hours: '98/135',
                budget: '$1.8k',
                completedTask: 38,
                deadline: '21/6/22',
                budgetSpent: '$2.4k',
                chipColor: 'warning',
                startDate: '18/8/21',
                members: '1.1k members',
                title: 'Admin Template',
                client: 'Jeffrey Phillips',
                avatar: '/images/logos/react-bg.png',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/4.png',
                        name: "Kaith D'souza"
                    },
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'John Doe'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: 'Alan Walker'
                    }
                ],
                description: "Time is our most valuable asset, that's why we want to help you save it."
            },
            {
                daysLeft: 45,
                comments: 98,
                budget: '$420',
                totalTask: 140,
                tasks: '22/140',
                hours: '880/421',
                completedTask: 95,
                chipColor: 'error',
                budgetSpent: '$980',
                deadline: '8/10/21',
                title: 'App Design',
                startDate: '24/7/21',
                members: '458 members',
                client: 'Ricky McDonald',
                avatar: '/images/logos/vue-bg.png',
                description: 'Figma dashboard app design combines the user UI & UX.',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Jimmy Ressula'
                    },
                    {
                        avatar: '/images/avatars/8.png',
                        name: 'Kristi Lawker'
                    },
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Danny Paul'
                    }
                ]
            },
            {
                comments: 120,
                daysLeft: 126,
                totalTask: 420,
                budget: '2.43k',
                tasks: '237/420',
                hours: '380/820',
                completedTask: 302,
                deadline: '12/9/22',
                budgetSpent: '$8.5k',
                chipColor: 'warning',
                startDate: '10/2/19',
                members: '137 members',
                client: 'Hulda Wright',
                title: 'Create Website',
                avatar: '/images/logos/html-bg.png',
                description: 'Your domain name should reflect your products or services so that your...',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Andrew Tye'
                    },
                    {
                        avatar: '/images/avatars/3.png',
                        name: 'Rishi Swaat'
                    },
                    {
                        avatar: '/images/avatars/4.png',
                        name: 'Rossie Kim'
                    }
                ]
            },
            {
                daysLeft: 5,
                comments: 20,
                totalTask: 285,
                tasks: '29/285',
                budget: '28.4k',
                hours: '142/420',
                chipColor: 'error',
                completedTask: 100,
                deadline: '25/12/21',
                startDate: '12/12/20',
                members: '82 members',
                budgetSpent: '$52.7k',
                client: 'Jerry Greene',
                title: 'Figma Dashboard',
                avatar: '/images/logos/figma-bg.png',
                description: "Time is our most valuable asset, that's why we want to help you save it.",
                avatarGroup: [
                    {
                        avatar: '/images/avatars/5.png',
                        name: 'Kim Merchent'
                    },
                    {
                        avatar: '/images/avatars/6.png',
                        name: "Sam D'souza"
                    },
                    {
                        avatar: '/images/avatars/7.png',
                        name: 'Nurvi Karlos'
                    }
                ]
            },
            {
                daysLeft: 4,
                comments: 98,
                budget: '$655',
                totalTask: 290,
                tasks: '29/290',
                hours: '580/445',
                completedTask: 290,
                budgetSpent: '$1.3k',
                chipColor: 'success',
                deadline: '02/11/21',
                startDate: '17/8/21',
                title: 'Logo Design',
                members: '16 members',
                client: 'Olive Strickland',
                avatar: '/images/logos/xd-bg.png',
                description: 'Premium logo designs created by top logo designers. Create the branding.',
                avatarGroup: [
                    {
                        avatar: '/images/avatars/8.png',
                        name: 'Kim Karlos'
                    },
                    {
                        avatar: '/images/avatars/1.png',
                        name: 'Katy Turner'
                    },
                    {
                        avatar: '/images/avatars/2.png',
                        name: 'Peter Adward'
                    }
                ]
            }
        ],
        connections: [
            {
                tasks: '834',
                projects: '18',
                isConnected: true,
                connections: '129',
                name: 'Mark Gilbert',
                designation: 'UI Designer',
                avatar: '/images/avatars/1.png',
                chips: [
                    {
                        title: 'Figma',
                        color: 'secondary'
                    },
                    {
                        title: 'Sketch',
                        color: 'warning'
                    }
                ]
            },
            {
                tasks: '2.31k',
                projects: '112',
                isConnected: false,
                connections: '1.28k',
                name: 'Eugenia Parsons',
                designation: 'Developer',
                avatar: '/images/avatars/2.png',
                chips: [
                    {
                        color: 'error',
                        title: 'Angular'
                    },
                    {
                        color: 'info',
                        title: 'React'
                    }
                ]
            },
            {
                tasks: '1.25k',
                projects: '32',
                isConnected: false,
                connections: '890',
                name: 'Francis Byrd',
                designation: 'Developer',
                avatar: '/images/avatars/3.png',
                chips: [
                    {
                        title: 'HTML',
                        color: 'primary'
                    },
                    {
                        color: 'info',
                        title: 'React'
                    }
                ]
            },
            {
                tasks: '12.4k',
                projects: '86',
                isConnected: false,
                connections: '890',
                name: 'Leon Lucas',
                designation: 'UI/UX Designer',
                avatar: '/images/avatars/4.png',
                chips: [
                    {
                        title: 'Figma',
                        color: 'secondary'
                    },
                    {
                        title: 'Sketch',
                        color: 'warning'
                    },
                    {
                        color: 'primary',
                        title: 'Photoshop'
                    }
                ]
            },
            {
                tasks: '23.8k',
                projects: '244',
                isConnected: true,
                connections: '2.14k',
                name: 'Jayden Rogers',
                designation: 'Full Stack Developer',
                avatar: '/images/avatars/5.png',
                chips: [
                    {
                        color: 'info',
                        title: 'React'
                    },
                    {
                        title: 'HTML',
                        color: 'warning'
                    },
                    {
                        color: 'success',
                        title: 'Node.js'
                    }
                ]
            },
            {
                tasks: '1.28k',
                projects: '32',
                isConnected: false,
                designation: 'SEO',
                connections: '1.27k',
                name: 'Jeanette Powell',
                avatar: '/images/avatars/6.png',
                chips: [
                    {
                        title: 'Analysis',
                        color: 'secondary'
                    },
                    {
                        color: 'success',
                        title: 'Writing'
                    }
                ]
            }
        ]
    },
    profileHeader: {
        fullName: 'John Doe',
        location: 'Vatican City',
        joiningDate: 'April 2021',
        designation: 'UX Designer',
        profileImg: '/images/avatars/1.png',
        designationIcon: 'tabler-palette',
        coverImg: '/images/pages/profile-banner.png'
    }
};
}),
"[project]/src/app/server/actions.ts [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/* __next_internal_action_entry_do_not_use__ [{"00c6ca9248b623ecf5cd8f89a63db15e9aa3d70b2a":"getProfileData"},"",""] */ __turbopack_context__.s([
    "getProfileData",
    ()=>getProfileData
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)");
// Data Imports
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fake$2d$db$2f$pages$2f$userProfile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/fake-db/pages/userProfile.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)");
;
;
const getProfileData = async ()=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$fake$2d$db$2f$pages$2f$userProfile$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["db"];
};
;
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$action$2d$validate$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["ensureServerEntryExports"])([
    getProfileData
]);
(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$webpack$2f$loaders$2f$next$2d$flight$2d$loader$2f$server$2d$reference$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["registerServerReference"])(getProfileData, "00c6ca9248b623ecf5cd8f89a63db15e9aa3d70b2a", null);
}),
"[project]/.next-internal/server/app/[lang]/(dashboard)/dashboards/analytics/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/server/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$server$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/server/actions.ts [app-rsc] (ecmascript)");
;
}),
"[project]/.next-internal/server/app/[lang]/(dashboard)/dashboards/analytics/page/actions.js { ACTIONS_MODULE0 => \"[project]/src/app/server/actions.ts [app-rsc] (ecmascript)\" } [app-rsc] (server actions loader, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "00c6ca9248b623ecf5cd8f89a63db15e9aa3d70b2a",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$server$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["getProfileData"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f2e$next$2d$internal$2f$server$2f$app$2f5b$lang$5d2f28$dashboard$292f$dashboards$2f$analytics$2f$page$2f$actions$2e$js__$7b$__ACTIONS_MODULE0__$3d3e$__$225b$project$5d2f$src$2f$app$2f$server$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$2922$__$7d$__$5b$app$2d$rsc$5d$__$28$server__actions__loader$2c$__ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i('[project]/.next-internal/server/app/[lang]/(dashboard)/dashboards/analytics/page/actions.js { ACTIONS_MODULE0 => "[project]/src/app/server/actions.ts [app-rsc] (ecmascript)" } [app-rsc] (server actions loader, ecmascript) <locals>');
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$server$2f$actions$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/server/actions.ts [app-rsc] (ecmascript)");
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/server-reference.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/* eslint-disable import/no-extraneous-dependencies */ Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "registerServerReference", {
    enumerable: true,
    get: function() {
        return _server.registerServerReference;
    }
});
const _server = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-server-dom-turbopack-server.js [app-rsc] (ecmascript)"); //# sourceMappingURL=server-reference.js.map
}),
"[project]/node_modules/next/dist/build/webpack/loaders/next-flight-loader/action-validate.js [app-rsc] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

// This function ensures that all the exported values are valid server actions,
// during the runtime. By definition all actions are required to be async
// functions, but here we can only check that they are functions.
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ensureServerEntryExports", {
    enumerable: true,
    get: function() {
        return ensureServerEntryExports;
    }
});
function ensureServerEntryExports(actions) {
    for(let i = 0; i < actions.length; i++){
        const action = actions[i];
        if (typeof action !== 'function') {
            throw Object.defineProperty(new Error(`A "use server" file can only export async functions, found ${typeof action}.\nRead more: https://nextjs.org/docs/messages/invalid-use-server-value`), "__NEXT_ERROR_CODE", {
                value: "E352",
                enumerable: false,
                configurable: true
            });
        }
    }
} //# sourceMappingURL=action-validate.js.map
}),
];

//# sourceMappingURL=_4260d973._.js.map