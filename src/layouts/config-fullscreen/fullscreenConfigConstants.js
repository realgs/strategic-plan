export const FULLSCREEN_CONFIG_MODULES = {
    SHIFTS: 'shifts',
};

export const ALL_FULLSCREEN_CONFIG_MODULES = [
    ...Object.values((FULLSCREEN_CONFIG_MODULES)),
];

export const FULLSCREEN_CONFIG_SIDEBAR_SECTIONS = {
    TEAM: 'team',
    SCHEDULES: 'schedules',
    CALENDARS: 'calendars',
    LEGAL: 'legal',
};

export const ORDERED_SIDEBAR_SECTIONS = [
    FULLSCREEN_CONFIG_SIDEBAR_SECTIONS.TEAM,
    FULLSCREEN_CONFIG_SIDEBAR_SECTIONS.SCHEDULES,
    FULLSCREEN_CONFIG_SIDEBAR_SECTIONS.CALENDARS,
    FULLSCREEN_CONFIG_SIDEBAR_SECTIONS.LEGAL,
    ...Object.values(FULLSCREEN_CONFIG_MODULES),
];
