import { Box, Container, Group, Text, Tooltip } from '@mantine/core';
import { add, differenceInSeconds, format, startOfToday } from 'date-fns';
import { useEffect, useState } from 'react';

interface Group {
    label: string;
    color: string;
    backgroundColor: string;
    items: Item[];
}
interface Item {
    label: string;
    duration: number;
}

const groups: Group[] = [
    {
        label: '導入',
        color: '#BB271A',
        backgroundColor: '#FCEFEF',
        items: [
            {
                label: '挨拶・自己紹介',
                duration: 3
            },
            {
                label: '授業概要説明',
                duration: 1
            },
            {
                label: '授業目的説明',
                duration: 3
            },
            {
                label: 'ワークシートの説明',
                duration: 4
            },
            {
                label: 'アイスブレイク',
                duration: 6
            },
            {
                label: 'リーダー決め',
                duration: 3
            }
        ]
    },
    {
        label: '知る活動',
        color: '#DA954B',
        backgroundColor: '#FEF8E7',
        items: [
            {
                label: '知る活動について・ジグソーリサーチ説明',
                duration: 2
            },
            {
                label: 'ジグソーリサーチ',
                duration: 12
            },
            {
                label: 'ジグソーリサーチの共有',
                duration: 7
            },
            {
                label: 'Kahootの導入',
                duration: 2
            },
            {
                label: 'Kahoot',
                duration: 6
            },
            {
                label: 'チーム順位記入',
                duration: 1
            }
        ]
    },
    {
        label: '休み時間',
        color: '#D9D9D9',
        backgroundColor: '#D9D9D9',
        items: [
            {
                label: '休み時間',
                duration: 10
            }
        ]
    },
    {
        label: '創る活動',
        color: '#48752C',
        backgroundColor: '#F4FFEE',
        items: [
            {
                label: '創る活動についての説明・ストーリー',
                duration: 2
            },
            {
                label: '学校名決め',
                duration: 2
            },
            {
                label: 'バイキング説明',
                duration: 1
            },
            {
                label: '設備バイキング',
                duration: 8
            },
            {
                label: '制度バイキング',
                duration: 8
            },
            {
                label: '単元バイキング',
                duration: 8
            },
            {
                label: 'スクリーンショット共有',
                duration: 3
            },
            {
                label: '他のグループのワークシートを見る',
                duration: 4
            },
            {
                label: 'ワークシート修正',
                duration: 5
            }
        ]
    },
    {
        label: 'まとめ',
        color: '#6A2246',
        backgroundColor: '#F7F4FE',
        items: [
            {
                label: '他己評価',
                duration: 6
            },
            {
                label: 'まとめ',
                duration: 3
            }
        ]
    }
];

const scale = 30;

const startHour = 9;
const startMinute = 45;
const startTime = add(startOfToday(), { hours: startHour, minutes: startMinute });

export default function App() {
    const [time, setTime] = useState(() => new Date());
    const elapsedTime = differenceInSeconds(time, startTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    let totalDuration = 0;

    return (
        <Container size='md' my='xl' sx={{ position: 'relative' }}>
            <Container size='xs'>
                {groups.map((group, i) => (
                    <Group sx={{ alignItems: 'stretch' }} spacing={0} key={i}>
                        <Box
                            py='md'
                            sx={{
                                position: 'relative',
                                backgroundColor: group.color
                            }}
                        >
                            <Text
                                size='xl'
                                weight={800}
                                color='white'
                                sx={{ position: 'sticky', top: '16px', writingMode: 'vertical-rl' }}
                            >
                                {group.label}
                            </Text>
                        </Box>
                        <Box sx={{ flexGrow: 1, backgroundColor: group.backgroundColor }}>
                            {group.items.map((item, j) => {
                                const start = add(startTime, { minutes: totalDuration });
                                const end = add(start, { minutes: item.duration });
                                totalDuration += item.duration;

                                return (
                                    <Tooltip
                                        label={`${format(start, 'HH:mm')}~${format(end, 'HH:mm')}`}
                                        position='right'
                                    >
                                        <Box
                                            sx={{
                                                height: item.duration * scale,
                                                textAlign: 'center',
                                                border: '1px solid #000'
                                            }}
                                            key={j}
                                        >
                                            <Text size='xl'>{item.label}</Text>
                                        </Box>
                                    </Tooltip>
                                );
                            })}
                        </Box>
                    </Group>
                ))}
            </Container>

            <Group
                position='apart'
                sx={{
                    position: 'absolute',
                    width: '100%',
                    top: (elapsedTime / 60) * scale,
                    borderTop: '2px solid red',
                    pointerEvents: 'none'
                }}
            >
                <Text size='xl' ml='md'>
                    {format(time, 'HH:mm:ss')}
                </Text>
                <Text size='xl' mr='md'>
                    {format(add(startOfToday(), { seconds: elapsedTime }), 'mm:ss')}
                </Text>
            </Group>
        </Container>
    );
}
