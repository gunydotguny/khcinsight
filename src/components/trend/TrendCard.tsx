import { Box, ButtonBase, Typography } from "@mui/material";
import { amber, blue, grey, purple } from "@mui/material/colors";
import { useRouter } from "next/router";
import Badge from "../common/Badge";
import Image from "next/image";


function isWithin3Days(dateStr: string): boolean {
    const inputDate = new Date(dateStr);
    const today = new Date();

    // 밀리초 단위 차이 계산
    const diffTime = Math.abs(today.getTime() - inputDate.getTime());
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    return diffDays <= 3;
}

export default function TrendCard({ item }: { item: any }) {
    const { post_id, post_date, trend_title, summary } = item
    return <Box
        sx={{
            border: `1px solid ${grey[100]}`,
            borderRadius: 1,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            bgcolor: '#ffffff'
        }}
    >
        <Box sx={{ flex: 1, }}>
            <Box sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column'
            }}>
                <Box sx={{ mb: 1, display: 'flex', gap: 0.5 }}>
                    {item.job.map((item: any, index: any) => <Badge key={index} category={item} />)}
                </Box>
                <Typography
                    sx={{
                        fontSize: 16,
                        fontWeight: 700,
                        mb: 1,
                    }}
                >
                    {item.news_title}
                </Typography>
                <Typography
                    sx={{
                        fontSize: 14,
                        lineHeight: '20px',
                        mb: 1,
                    }}
                >
                    {summary}
                </Typography>
                <Box sx={{
                    display: 'flex'
                }}>
                    <Typography
                        sx={{
                            fontSize: 12,
                            lineHeight: '16px',
                            // fontWeight: 700,
                            color: grey[500],
                            '> .dot': {
                                ml: 0.5,
                                mr: 0.5,
                            },
                        }}
                    >
                        {/* {item.region}{<span className="dot">·</span>} */}
                        {post_date}
                    </Typography>
                    {isWithin3Days(post_date) && <Typography
                        sx={{
                            fontSize: 12,
                            lineHeight: '16px',
                            fontWeight: 700,
                            ml: 0.75,
                            color: '#ff0000 !important',
                        }}
                    >NEW!</Typography>}

                </Box>
            </Box>
            <Box sx={{
                p: 2,
                mt: -2,
                width: '100%',
            }}>
                <Typography sx={{
                    color: blue[500]
                }}>
                    #예약, #보험, #마이데이터
                </Typography>
            </Box>
        </Box>
        <Box sx={{
            display: 'flex',
            width: '100%',
            borderTop: `1px solid ${grey[100]}`,
        }}>
            <ButtonBase
                disabled={!item.source_url}
                sx={{
                    // border: `1px solid ${blueGrey[100]}`,
                    // borderRadius: 0.5,
                    // px: 0.5,
                    // py: 0.5,
                    flex: 1,
                    justifyContent: 'center',
                    py: 1.5,
                    bgcolor: amber[500]
                }}
                onClick={() => {
                    if (item.source_url) {
                        window.open(item.source_url, "_blank", "noopener,noreferrer");
                    }
                }}
            >
                <Image
                    src="/logo/agit.png" // public/logo.png
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    style={{
                        width: 20,
                        height: 20,
                        marginRight: 8,
                    }}
                />
                <Typography sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                }}>아지트에서 보기</Typography>
            </ButtonBase>
            <ButtonBase
                disabled={!item.trend_url}
                sx={{
                    // border: `1px solid ${blueGrey[100]}`,
                    // borderRadius: 0.5,
                    // px: 0.5,
                    // py: 0.5,
                    flex: 1,
                    justifyContent: 'center',
                    py: 1.5,
                    borderLeft: `1px solid ${grey[100]}`,
                    bgcolor: grey[900]
                }}
                onClick={() => {
                    if (item.source_url) {
                        window.open(item.trend_url, "_blank", "noopener,noreferrer");
                    }
                }}
            >
                <Typography sx={{
                    fontSize: 14,
                    lineHeight: '20px',
                    color: '#ffffff'
                }}>🔗  뉴스 원문 보기</Typography>
            </ButtonBase>
        </Box>
    </Box >
}