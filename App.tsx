
import React, { useState, useCallback, useEffect, useRef } from 'react';

// --- Constants & Data ---
const ADVICE_LIST: string[] = [
  "Uống một cốc nước lớn ngay bây giờ.",
  "Dành 5 phút để dọn dẹp bàn làm việc.",
  "Viết ra 3 điều bạn biết ơn hôm nay.",
  "Đi bộ nhanh trong 5 phút để tăng năng lượng.",
  "Đọc một vài trang sách bạn yêu thích.",
  "Nghe một bản nhạc vui tươi và không lời.",
  "Nhắm mắt và hít thở sâu trong một phút.",
  "Lên kế hoạch cho một việc nhỏ bạn sẽ làm vào ngày mai.",
  "Gửi một tin nhắn cảm ơn đến ai đó.",
  "Vươn vai và giãn cơ tại chỗ.",
  "Nhìn ra ngoài cửa sổ và tập trung vào một vật ở xa trong 20 giây.",
  "Lau sạch màn hình điện thoại và máy tính.",
  "Sắp xếp lại các biểu tượng trên màn hình desktop.",
  "Xóa 10 email cũ không cần thiết trong hộp thư đến.",
  "Viết ra một mục tiêu nhỏ cho tuần này.",
  "Mỉm cười với chính mình trong gương.",
  "Học một từ mới bằng một ngôn ngữ khác.",
  "Xem một video TED-Ed ngắn (dưới 5 phút).",
  "Bỏ theo dõi một tài khoản mạng xã hội tiêu cực.",
  "Chuẩn bị quần áo cho ngày mai.",
  "Ăn một miếng trái cây.",
  "Tự khen mình về một thành tựu nhỏ gần đây.",
  "Tìm và lưu một công thức nấu ăn mới.",
  "Tưới nước cho cây cối trong nhà/văn phòng.",
  "Ghi lại một ý tưởng bất chợt vào sổ tay.",
  "Đứng dậy và đi lại quanh phòng.",
  "Sắp xếp lại ví hoặc túi xách của bạn.",
  "Gập gọn chăn màn hoặc sắp xếp lại gối.",
  "Tìm một câu trích dẫn truyền cảm hứng và đọc nó.",
  "Lên danh sách nhạc cho việc tập trung.",
  "Nghĩ về một kỷ niệm vui và mỉm cười.",
  "Đặt một lời nhắc uống nước sau mỗi giờ.",
  "Thử bài tập thở hộp: hít vào 4 giây, giữ 4 giây, thở ra 4 giây.",
  "Viết ra một điều bạn học được ngày hôm qua.",
  "Rửa tay và mặt với nước mát.",
  "Gửi một meme vui nhộn cho một người bạn.",
  "Lên kế hoạch cho bữa trưa lành mạnh ngày mai.",
  "Sắp xếp lại ngăn kéo bàn làm việc.",
  "Tìm hiểu về một sự thật thú vị.",
  "Vẽ một hình vẽ nguệch ngoạc trong 2 phút.",
  "Kiểm tra danh sách việc cần làm và gạch bỏ những gì đã hoàn thành.",
  "Nói 'không' với một yêu cầu không quan trọng.",
  "Tìm một podcast thú vị và nghe thử 5 phút.",
  "Ghi lại cảm xúc của bạn ngay bây giờ.",
  "Lên lịch một cuộc hẹn mà bạn đã trì hoãn.",
  "Để điện thoại ở chế độ im lặng trong 15 phút.",
];

const PIXEL_ART_COLORS: string[] = [
  '#ef4444', '#f97316', '#f59e0b', '#eab308',
  '#84cc16', '#22c55e', '#10b981', '#14b8a6',
  '#06b6d4', '#0ea5e9', '#3b82f6', '#6366f1',
  '#8b5cf6', '#a855f7', '#d946ef', '#ec4899',
  '#ffffff', '#f0f0f0', '#c0c0c0', '#808080', '#000000',
];

const STORY_LIST: string[] = [
    "Một con kiến đang đi trên sa mạc, nó khát nước quá bèn nói: 'Giá mà có một giọt nước ở đây, mình sẽ biến nó thành cả một dòng sông!'. Bỗng một giọt nước rơi xuống. Con kiến hét lên: 'Trời ơi, lụt!'.",
    "Hai con ruồi đang nói chuyện trong bếp. Một con hỏi: 'Sao trông cậu buồn thế?'. Con kia đáp: 'Tớ vừa đậu vào miếng bánh sinh nhật, mà người ta thổi nến bay cả tớ đi!'.",
    "Thầy giáo hỏi Tí: 'Em hãy cho thầy biết, con gì vừa to vừa không biết bơi?'. Tí suy nghĩ một lúc rồi trả lời: 'Dạ thưa thầy, là... cái thuyền ạ!'.",
    "Có một anh chàng đi câu cá. Cả ngày không được con nào. Chiều về, anh ta ghé vào chợ mua một con cá rô phi và nói với người bán: 'Bác làm ơn tung con cá này lên cho cháu, để cháu bắt lấy nó. Cháu muốn về nhà kể là cháu tự tay câu được ạ!'.",
    "Một quả chuối đi dạo trong công viên thì gặp một quả táo. Quả chuối hỏi: 'Sao cậu lại đỏ mặt thế?'. Quả táo thẹn thùng: 'Tại tớ... quên mặc áo!'.",
    "Một con ốc sên bò lên cây. Mất ba ngày nó mới lên đến ngọn. Vừa lên tới nơi, nó thở hổn hển rồi nói: 'Mệt quá! Lần sau không bao giờ leo cây nữa... trừ khi có ai đó đẩy mình lên!'.",
    "Trong lớp học, cô giáo hỏi: 'Các em, ai có thể cho cô biết tại sao chim cánh cụt không thể bay?'. Tèo giơ tay: 'Dạ thưa cô, vì nó béo quá ạ!'.",
    "Một con ma cà rồng về nhà với khuôn mặt trắng bệch. Vợ nó hỏi: 'Anh sao thế?'. Nó đáp: 'Anh vừa gặp một người, hút máu xong mới biết họ bị tiểu đường. Ngọt quá!'.",
    "Hai hạt cát đi trên sa mạc. Một hạt nói với hạt kia: 'Cậu có cảm thấy chúng ta đang bị theo dõi không?'.",
    "Tại sao con sứa lại không có não? Vì nếu có, nó đã không trôi dạt vô định như vậy!",
    "Một người đàn ông vào thư viện và hỏi: 'Cho tôi mượn cuốn sách về cách tự tử.' Thủ thư nhìn ông ta rồi nói: 'Đi ra khỏi đây! Ông sẽ không trả lại nó đâu!'.",
    "Chồng nói với vợ: 'Em yêu, anh vừa trúng số! Em mau gói ghém hành lý đi.' Vợ vui mừng hỏi: 'Em nên mang theo quần áo mùa hè hay mùa đông?' Chồng đáp: 'Mang hết đi. Và đi ngay cho khuất mắt anh.'",
    "Tại sao quả cà chua lại đỏ? Vì nó nhìn thấy... salad thay đồ!",
    "Mẹ ơi, hôm nay con được điểm 10.' Mẹ Tí vui mừng: 'Con trai mẹ giỏi quá! Môn gì thế con?' Tí đáp: 'Dạ, môn Toán, Lý, Hóa cộng lại ạ.'",
    "Hai con bò đang nói chuyện. Một con nói: 'Cậu có nghe tin về bệnh bò điên chưa?' Con kia đáp: 'Lo gì, chúng ta là trực thăng mà.'",
    "Gấu trúc vào nhà hàng, ăn một bữa no nê, rồi rút súng bắn một phát lên trời và bỏ đi. Quản lý hỏi: 'Tại sao?'. Gấu trúc đưa cho ông một cuốn từ điển, chỉ vào mục 'Panda': 'Eats, shoots and leaves.' (Ăn, bắn và rời đi - chơi chữ với 'eats shoots and leaves' - ăn măng và lá).",
    "Tại sao con ma lại sợ đi thang máy? Vì nó sợ... mất hồn.",
    "Thầy giáo hỏi: 'Tèo, sao hôm qua em nghỉ học?'. Tèo: 'Dạ, tại em mơ thấy mình đang đá bóng, trận đấu kéo dài quá nên em ngủ thêm để đá hiệp phụ ạ.'",
    "Một người đàn ông đến gặp bác sĩ tâm lý: 'Bác sĩ, tôi cứ nghĩ mình là một con chó.' Bác sĩ: 'Anh bị thế này bao lâu rồi?'. 'Dạ, từ lúc tôi còn là một con cún con.'",
    "Vì sao con gà mái lại đi qua đường? Để chứng minh cho con gà trống thấy nó không phải là đồ nhát gan!",
    "Một con sâu nói với con sâu kia: 'Chúng ta đi dạo một vòng quanh quả táo nhé?'",
    "Giáo viên: 'Ai có thể định nghĩa 'sự trùng hợp'?' Tèo: 'Thưa cô, bố và mẹ em cưới nhau trong cùng một ngày ạ.'",
    "Một tên trộm đột nhập vào nhà lúc nửa đêm. Hắn nghe thấy một giọng nói: 'Jesus đang theo dõi ngươi.' Hắn giật mình nhìn quanh không thấy ai, liền tiếp tục. Giọng nói lại vang lên. Tên trộm sợ hãi bật đèn pin lên, và thấy một con vẹt. Hắn hỏi: 'Mày là Jesus à?'. Con vẹt đáp: 'Không, tao là Moses. Jesus là con chó Doberman đang đứng sau lưng mày kia kìa.'",
    "Hai chiếc máy tính nói chuyện với nhau. Một chiếc nói: 'Tớ mệt quá, chắc tớ cần một 'byte' để ăn.'",
    "Một cậu bé hỏi bố: 'Bố ơi, tại sao mây lại trôi trên trời ạ?'. Bố cậu đáp: 'Vì nếu nó đi bộ, chân nó sẽ mỏi.'",
];

const LOCATION_LIST: string[] = [
    "Abu Dhabi, UAE", "Abuja, Nigeria", "Accra, Ghana", "Amsterdam, Hà Lan", "Ankara, Thổ Nhĩ Kỳ",
    "Astana, Kazakhstan", "Athens, Hy Lạp", "Baghdad, Iraq", "Bangkok, Thái Lan", "Bắc Kinh, Trung Quốc",
    "Berlin, Đức", "Bern, Thụy Sĩ", "Bogotá, Colombia", "Brasília, Brazil", "Brussels, Bỉ",
    "Bucharest, Romania", "Budapest, Hungary", "Buenos Aires, Argentina", "Cairo, Ai Cập", "Canberra, Úc",
    "Caracas, Venezuela", "Copenhagen, Đan Mạch", "Dhaka, Bangladesh", "Doha, Qatar", "Dublin, Ireland",
    "Hà Nội, Việt Nam", "Havana, Cuba", "Helsinki, Phần Lan", "Islamabad, Pakistan", "Jakarta, Indonesia",
    "Jerusalem, Israel", "Kabul, Afghanistan", "Kampala, Uganda", "Kathmandu, Nepal", "Kyiv, Ukraine",
    "Lima, Peru", "Lisbon, Bồ Đào Nha", "London, Vương quốc Anh", "Madrid, Tây Ban Nha", "Manila, Philippines",
    "Mexico City, Mexico", "Minsk, Belarus", "Moscow, Nga", "Nairobi, Kenya", "New Delhi, Ấn Độ",
    "Oslo, Na Uy", "Ottawa, Canada", "Paris, Pháp", "Prague, Cộng hòa Séc", "Riyadh, Ả Rập Xê Út",
    "Rome, Ý", "Seoul, Hàn Quốc", "Singapore, Singapore", "Stockholm, Thụy Sĩ", "Tehran, Iran",
    "Tokyo, Nhật Bản", "Vienna, Áo", "Warsaw, Ba Lan", "Washington, D.C., Hoa Kỳ", "Wellington, New Zealand"
];

const SOUND_LIST: string[] = [
    "Gâu gâu! (Chó)", "Meo meo! (Mèo)", "Ò ó o! (Gà trống)", "Cục tác! (Gà mái)",
    "Quạc quạc! (Vịt)", "Be be! (Cừu)", "Ụt ịt! (Lợn)", "Bò ò ò! (Bò)",
    "Ít ộp! (Ếch)", "Hót líu lo! (Chim)", "Gù gù! (Bồ câu)", "Cú cú! (Cú mèo)",
    "Grừ grừ! (Sư tử)", "Hú hú! (Khỉ)", "Tí tách! (Dế)", "Ò e! (Lừa)",
    "Mó mó! (Dê)", "Eng éc! (Ngỗng)", "Chít chít! (Chuột)", "Khè khè! (Rắn)",
    "Gầm gừ! (Gấu)", "Tí te! (Voi)", "Rống! (Hổ)", "Hí hí! (Ngựa)",
    "Cạp cạp! (Thỏ)", "Vo ve! (Ong)", "Lạch cạch! (Cua)", "Phì phì! (Hà mã)",
    "Két két! (Vẹt)", "Hót véo von! (Sơn ca)"
];

const SONG_LIST: string[] = [
    "Blinding Lights - The Weeknd",
    "Shape of You - Ed Sheeran",
    "Someone You Loved - Lewis Capaldi",
    "Dance Monkey - Tones and I",
    "Rockstar - Post Malone ft. 21 Savage",
    "Sunflower - Post Malone, Swae Lee",
    "One Dance - Drake ft. Wizkid, Kyla",
    "Closer - The Chainsmokers ft. Halsey",
    "Believer - Imagine Dragons",
    "Perfect - Ed Sheeran",
    "Havana - Camila Cabello ft. Young Thug",
    "Bad Guy - Billie Eilish",
    "Say You Won't Let Go - James Arthur",
    "Lucid Dreams - Juice WRLD",
    "All of Me - John Legend",
    "God's Plan - Drake",
    "Thinking Out Loud - Ed Sheeran",
    "Watermelon Sugar - Harry Styles",
    "Bohemian Rhapsody - Queen",
    "Don't Start Now - Dua Lipa",
    "Photograph - Ed Sheeran",
    "Lovely - Billie Eilish, Khalid",
    "Shallow - Lady Gaga, Bradley Cooper",
    "Uptown Funk - Mark Ronson ft. Bruno Mars",
    "Counting Stars - OneRepublic",
    "Something Just Like This - The Chainsmokers, Coldplay",
    "Take Me to Church - Hozier",
    "7 Rings - Ariana Grande",
    "Stressed Out - Twenty One Pilots",
    "The Hills - The Weeknd",
    "Faded - Alan Walker",
    "See You Again - Wiz Khalifa ft. Charlie Puth",
    "Can't Stop the Feeling! - Justin Timberlake",
    "Wake Me Up - Avicii",
    "Lean On - Major Lazer, MØ, DJ Snake",
    "Despacito - Luis Fonsi ft. Daddy Yankee",
    "Old Town Road - Lil Nas X ft. Billy Ray Cyrus",
    "Señorita - Shawn Mendes, Camila Cabello",
    "Circles - Post Malone",
    "As It Was - Harry Styles",
    "Stay - The Kid LAROI, Justin Bieber",
    "Heat Waves - Glass Animals",
    "Levitating - Dua Lipa",
    "Good 4 U - Olivia Rodrigo",
    "Peaches - Justin Bieber ft. Daniel Caesar, Giveon",
    "Save Your Tears - The Weeknd",
    "Montero (Call Me By Your Name) - Lil Nas X",
    "Drivers License - Olivia Rodrigo",
    "Industry Baby - Lil Nas X, Jack Harlow",
    "Happier Than Ever - Billie Eilish"
];

const FACT_LIST: string[] = [
    "Mật ong không bao giờ hỏng. Các nhà khảo cổ đã tìm thấy những hũ mật ong trong các lăng mộ Ai Cập cổ đại vẫn còn ăn được.",
    "Bạch tuộc có ba trái tim.",
    "Chuối là một loại quả mọng (berry), trong khi dâu tây thì không.",
    "Tháp Eiffel có thể cao hơn 15 cm vào mùa hè do sự giãn nở vì nhiệt của kim loại.",
    "Âm thanh không thể truyền trong chân không.",
    "Chỉ có khoảng 2% dân số thế giới có mắt màu xanh lá cây.",
    "Một con ốc sên có thể ngủ trong ba năm.",
    "Tim của cá voi xanh lớn đến mức một người có thể bơi qua các động mạch của nó.",
    "Nước nóng đóng băng nhanh hơn nước lạnh, một hiện tượng được gọi là hiệu ứng Mpemba.",
    "Dấu vân tay của gấu túi (koala) gần như không thể phân biệt được với dấu vân tay của con người.",
    "Trên sao Kim, một ngày dài hơn một năm.",
    "Có nhiều cây trên Trái Đất hơn là sao trong Dải Ngân Hà.",
    "Cá mập đã tồn tại lâu hơn cả cây cối.",
    "Lửa lan nhanh hơn khi lên dốc so với xuống dốc.",
    "Não người hoạt động mạnh hơn khi ngủ so với khi xem TV.",
    "Trung bình, một đám mây nặng khoảng 500 tấn.",
    "Cleopatra sống gần với thời điểm phát minh ra iPhone hơn là thời điểm xây dựng Đại kim tự tháp Giza.",
    "Ngựa không thể thở bằng miệng.",
    "Đại học Oxford lâu đời hơn Đế chế Aztec.",
    "Rái cá biển nắm tay nhau khi ngủ để không bị trôi đi.",
    "Chất độc của loài sứa hộp có thể giết chết một người trong vòng vài phút.",
    "Sao Hải Vương là hành tinh có gió mạnh nhất trong Hệ Mặt Trời, với tốc độ lên tới 2.100 km/h.",
    "Phần lớn bụi trong nhà bạn được tạo thành từ các tế bào da chết của bạn.",
    "Một con gián có thể sống vài tuần không có đầu.",
    "Mona Lisa không có lông mày.",
    "Cú không có nhãn cầu. Chúng có 'ống mắt'.",
    "Mũ của đầu bếp (toque) có 100 nếp gấp, được cho là đại diện cho 100 cách để nấu một quả trứng.",
    "Cà rốt ban đầu có màu tím.",
    "Sao Hỏa có màu đỏ vì bề mặt của nó chứa đầy gỉ sét (ôxít sắt)."
];

const EMOJI_LIST: string[] = [
    '😀', '😂', '😍', '🤔', '😎', '😭', '🤯', '🥳', '😴', '👍',
    '❤️', '🚀', '⭐', '🎉', '💯', '🔥', '🐶', '🍕', '⚽', '🤖',
    '😅', '😇', '😉', '😋', '😱', '😡', '🤡', '👻', '👽', '🙏',
    '💪', '👀', '🌍', '💡', '🎸', '☕', '🎂', '🍉', '👑', '💸'
];

type Website = {
  name: string;
  description: string;
};

const WEBSITE_LIST: Website[] = [
    { name: "Google", description: "Công cụ tìm kiếm thông tin hàng đầu thế giới." },
    { name: "YouTube", description: "Nền tảng chia sẻ và xem video lớn nhất hành tinh." },
    { name: "Facebook", description: "Mạng xã hội kết nối bạn bè, gia đình và cộng đồng." },
    { name: "Wikipedia", description: "Bách khoa toàn thư mở trực tuyến với hàng triệu bài viết." },
    { name: "Amazon", description: "Trang thương mại điện tử khổng lồ, bán lẻ mọi thứ." },
    { name: "Netflix", description: "Dịch vụ xem phim và chương trình truyền hình trực tuyến." },
    { name: "Reddit", description: "Tập hợp các diễn đàn và cộng đồng trực tuyến đa dạng." },
    { name: "Twitter (X)", description: "Mạng xã hội tin tức và thảo luận theo thời gian thực." },
    { name: "Instagram", description: "Nền tảng chia sẻ ảnh và video qua di động." },
    { name: "LinkedIn", description: "Mạng xã hội dành cho các chuyên gia và kết nối công việc." },
    { name: "GitHub", description: "Nền tảng lưu trữ và quản lý mã nguồn cho lập trình viên." },
    { name: "Stack Overflow", description: "Diễn đàn hỏi đáp dành cho các nhà phát triển và lập trình viên." },
    { name: "Pinterest", description: "Công cụ khám phá ý tưởng sáng tạo qua hình ảnh." },
    { name: "Shopee", description: "Sàn thương mại điện tử phổ biến tại Đông Nam Á." },
    { name: "VnExpress", description: "Báo điện tử tin tức hàng đầu và uy tín tại Việt Nam." },
    { name: "Zing MP3", description: "Nền tảng nghe nhạc trực tuyến phổ biến tại Việt Nam." },
    { name: "Spotify", description: "Dịch vụ phát nhạc kỹ thuật số với hàng triệu bài hát." },
    { name: "Canva", description: "Công cụ thiết kế đồ họa trực tuyến dễ sử dụng cho mọi người." },
    { name: "Duolingo", description: "Ứng dụng học ngoại ngữ miễn phí và vui nhộn." },
    { name: "Coursera", description: "Cung cấp các khóa học trực tuyến từ các trường đại học hàng đầu." },
    { name: "Twitch", description: "Nền tảng streaming trực tiếp, đặc biệt là về trò chơi điện tử." },
    { name: "TikTok", description: "Mạng xã hội chia sẻ các video dạng ngắn." },
    { name: "Dropbox", description: "Dịch vụ lưu trữ đám mây để sao lưu và chia sẻ tệp tin." },
    { name: "Google Maps", description: "Dịch vụ bản đồ, chỉ đường và khám phá địa điểm." },
    { name: "Tiki", description: "Sàn thương mại điện tử lớn và uy tín của Việt Nam." },
    { name: "Lazada", description: "Một trong những nền tảng mua sắm trực tuyến hàng đầu khu vực." },
    { name: "The New York Times", description: "Tờ báo tin tức quốc tế uy tín có trụ sở tại Mỹ." },
    { name: "BBC News", description: "Kênh thông tấn và tin tức toàn cầu của Vương quốc Anh." },
    { name: "Microsoft", description: "Trang chủ của tập đoàn công nghệ phần mềm và phần cứng." },
    { name: "Apple", description: "Trang giới thiệu sản phẩm và dịch vụ của Apple Inc." }
];

const DECISION_LIST: string[] = [
    "Có", "Không", "Chắc chắn rồi", "Không đời nào", "Hãy thử lại sau",
    "Có lẽ", "Các dấu hiệu đều chỉ về 'Có'", "Đừng trông mong vào nó",
    "Rất có khả năng", "Khá nghi ngờ", "Triển vọng không tốt lắm",
    "Triển vọng rất tốt", "Hỏi lại đi", "Tập trung và hỏi lại"
];

const MOVIE_LIST: string[] = [
    "Nhà Tù Shawshank (The Shawshank Redemption)", "Bố Già (The Godfather)", "Kỵ Sĩ Bóng Đêm (The Dark Knight)",
    "Chuyện Tào Lao (Pulp Fiction)", "Bản Danh Sách Của Schindler (Schindler's List)", "Chúa Tể Những Chiếc Nhẫn: Sự Trở Lại Của Nhà Vua",
    "Forrest Gump", "Sàn Đấu Sinh Tử (Fight Club)", "Kẻ Đánh Cắp Giấc Mơ (Inception)", "Ma Trận (The Matrix)",
    "Chiến Hữu (Goodfellas)", "Chiến Tranh Giữa Các Vì Sao: Đế Chế Phản Công", "Chúa Tể Những Chiếc Nhẫn: Hiệp Hội Nhẫn Thần",
    "Bay Trên Tổ Chim Cúc Cu (One Flew Over the Cuckoo's Nest)", "Bảy Tội Lỗi Chết Người (Se7en)", "Sự Im Lặng Của Bầy Cừu",
    "Cuộc Sống Tươi Đẹp (It's a Wonderful life)", "Giải Cứu Binh Nhì Ryan (Saving Private Ryan)", "Vùng Đất Linh Hồn (Spirited Away)",
    "Dặm Xanh (The Green Mile)", "Ký Sinh Trùng (Parasite)", "Hố Đen Tử Thần (Interstellar)", "Vua Sư Tử (The Lion King)",
    "Võ Sĩ Giác Đấu (Gladiator)", "Ảo Thuật Gia Đấu Trí (The Prestige)", "Điệp Vụ Kép (The Departed)",
    "Tay Trống Cự Phách (Whiplash)", "Tình Bạn Đẹp (The Intouchables)", "Quái Vật Không Gian (Alien)",
    "Trở Lại Tương Lai (Back to the Future)", "Nghệ Sĩ Dương Cầm (The Pianist)", "Kẻ Tâm Thần (Psycho)",
    "Sát Thủ Chuyên Nghiệp (Léon: The Professional)", "Kẻ Chủ Mưu (The Usual Suspects)", "Kẻ Hủy Diệt 2: Ngày Phán Xét",
    "Thời Đại Tân Kỳ (Modern Times)", "Thành Phố Của Chúa (City of God)", "Mộ Đom Đóm (Grave of the Fireflies)",
    "Chuyện Tình Casablanca (Casablanca)", "Ngôi Nhà Ma (The Shining)", "Hành Trình Django (Django Unchained)",
    "Robot Biết Yêu (WALL·E)", "Gã Hề (Joker)", "Cỗ Máy Con Cưng (A Clockwork Orange)", "Tài Xế Taxi (Taxi Driver)",
    "Cuộc Đời Của Amélie Poulain (Amélie)", "Ánh Dương Vĩnh Cửu Của Tâm Hồn Tinh Khiết", "Chàng Will Tốt Bụng (Good Will Hunting)",
    "Câu Chuyện Đồ Chơi (Toy Story)", "Max Điên: Con Đường Cuồng Nộ (Mad Max: Fury Road)"
];

const SYMBOL_LIST: { name: string; svg: string }[] = [
  { name: 'Chó', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5z"/><path d="M8 7a4 4 0 0 0-4 4v1a4 4 0 0 0 4 4"/><path d="M16 7a4 4 0 0 1 4 4v1a4 4 0 0 1-4 4"/><path d="M12 17v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2v-3"/><path d="M12 17v3a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2v-3"/><path d="M12 11.5a.5.5 0 0 1-.5-.5v-1a.5.5 0 1 1 1 0v1a.5.5 0 0 1-.5.5z"/><path d="M10 9.5a.5.5 0 0 1 0-1h.5a.5.5 0 0 1 0 1h-.5z"/><path d="M14 9.5a.5.5 0 0 0 0-1h-.5a.5.5 0 0 0 0 1h.5z"/></svg>' },
  { name: 'Mèo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4C7.58 4 4 7.58 4 12s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/><path d="M9 4.5l-3 3"/><path d="M15 4.5l3 3"/><path d="M10 14c-.5-1-1.5-1-2 0"/><path d="M14 14c.5-1 1.5-1 2 0"/><path d="M12 12v3"/></svg>' },
  { name: 'Sư tử', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="M22 12h-2"/><path d="M4 12H2"/><path d="M19.07 4.93l-1.41 1.41"/><path d="M6.34 17.66l-1.41 1.41"/><path d="M19.07 19.07l-1.41-1.41"/><path d="M6.34 6.34L4.93 4.93"/><path d="M12 15v5"/><path d="M9 20h6"/></svg>' },
  { name: 'Hổ', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/><path d="M7 6l-2 2"/><path d="M17 6l2 2"/><path d="M12 15v3"/><path d="M9 18h6"/><path d="M8 10l-1.5 1.5"/><path d="M16 10l1.5 1.5"/><path d="M12 12l1 2 1-2"/><path d="M9 12h6"/></svg>' },
  { name: 'Voi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4a4 4 0 0 1 4 4v2"/><path d="M16 4a4 4 0 0 0-4 4v2"/><path d="M12 10c-4 0-8 3-8 7h16c0-4-4-7-8-7z"/><path d="M4 17v3h2"/><path d="M20 17v3h-2"/><path d="M12 10v4c0 3-2 5-2 5"/></svg>' },
  { name: 'Gấu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-4.42 0-8 3.58-8 8s3.58 8 8 8 8-3.58 8-8-3.58-8-8-8z"/><circle cx="9.5" cy="9.5" r="1.5"/><circle cx="14.5" cy="9.5" r="1.5"/><path d="M12 12c-1 0-2 1-2 2s1 2 2 2 2-1 2-2-1-2-2-2z"/></svg>' },
  { name: 'Hươu cao cổ', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 21v-8"/><path d="M9 13h6"/><path d="M12 13L8 5h8z"/><circle cx="9" cy="4" r="1"/><circle cx="15" cy="4" r="1"/><path d="M6 21h2"/><path d="M16 21h2"/></svg>' },
  { name: 'Khỉ', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M9 4a3 3 0 0 0-3 3v0"/><path d="M15 4a3 3 0 0 1 3 3v0"/><path d="M12 16c-3 0-6 2-6 4h12c0-2-3-4-6-4z"/><path d="M18 14a6 6 0 0 0-6-6 6 6 0 0 0-6 6"/></svg>' },
  { name: 'Cá sấu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l2-2h16l2 2-2 2H4z"/><path d="M4 14l-2 2h20l-2-2"/><path d="M9 10V8"/><path d="M15 10V8"/><path d="M6 14v2h2"/><path d="M18 14v2h-2"/></svg>' },
  { name: 'Rắn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s2-4 6-4 6 8 10 8 4-4 4-4"/><circle cx="6" cy="12" r="1" fill="currentColor"/></svg>' },
  { name: 'Cá mập', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l8-4 10 4-10 4-8-4z"/><path d="M10 8v10"/><path d="M12 4v4l-2-1 2 1"/></svg>' },
  { name: 'Cá voi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8c0 4-4 8-10 8-10 0-10-4-10-8z"/><path d="M7 10h1M18 14l-4-2 4-2"/><path d="M12 4V2"/></svg>' },
  { name: 'Bạch tuộc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M5 12c0-2 2-4 4-4"/><path d="M19 12c0-2-2-4-4-4"/><path d="M5 12c0 2 2 4 4 4"/><path d="M19 12c0 2-2 4-4 4"/><path d="M8 16v4"/><path d="M16 16v4"/><path d="M12 16v4"/></svg>' },
  { name: 'Cua', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z"/><path d="M4 8l-2-2 2-2"/><path d="M20 8l2-2-2-2"/><path d="M6 14H2"/><path d="M18 14H22"/><path d="M9 11v2"/><path d="M15 11v2"/></svg>' },
  { name: 'Tôm hùm', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2 0-4 2-4 4v4h8v-4c0-2-2-4-4-4z"/><path d="M8 8l-4-4"/><path d="M16 8l4-4"/><path d="M12 16v4"/><path d="M10 20h4"/><path d="M8 12H4"/><path d="M16 12H20"/></svg>' },
  { name: 'Gà', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4c-3 0-5 2-5 4 0 3 4 6 5 6s5-3 5-6c0-2-2-4-5-4z"/><path d="M8 14v4h8v-4"/><path d="M12 2v2"/><path d="M11 4h2"/></svg>' },
  { name: 'Vịt', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"/><path d="M7 10c0 4 5 8 5 8s5-4 5-8-2-4-5-4-5 0-5 4z"/><path d="M16 6h2"/></svg>' },
  { name: 'Ngựa', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h3l2-3h4l2 3h3v5l-3 4H8z"/><path d="M8 14v6h2"/><path d="M14 14v6h2"/><path d="M8 5V2"/><path d="M16 5V2"/></svg>' },
  { name: 'Lợn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><circle cx="12" cy="12" r="3"/><path d="M10 8L8 6"/><path d="M14 8L16 6"/><path d="M12 15v2"/><path d="M10 17h4"/></svg>' },
  { name: 'Cừu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M8 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M16 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 14c-4 0-8 2-8 5h16c0-3-4-5-8-5z"/></svg>' },
  { name: 'Bò', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 8h8v6H8z"/><path d="M8 5L6 3"/><path d="M16 5L18 3"/><path d="M10 17v-2h4v2"/></svg>' },
  { name: 'Chuột túi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V5z"/><path d="M12 9v8"/><path d="M9 17L5 21"/><path d="M15 17l4 4"/><path d="M10 14h4"/><path d="M10 5V3"/><path d="M14 5V3"/></svg>' },
  { name: 'Chim cánh cụt', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3.31 0-6 2.69-6 6v8c0 3.31 2.69 6 6 6s6-2.69 6-8V8c0-3.31-2.69-6-6-6z"/><path d="M12 8m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/><path d="M9 18h6"/><path d="M7 12l-3-2v4l3-2z"/><path d="M17 12l3-2v4l-3-2z"/></svg>' },
  { name: 'Cú', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><circle cx="9" cy="10" r="2"/><circle cx="15" cy="10" r="2"/><path d="M12 14l-1-2h2z"/><path d="M10 4L8 2"/><path d="M14 4L16 2"/></svg>' },
  { name: 'Đại bàng', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l-8 8h4v12h8V10h4z"/><path d="M12 6c-2 0-3 1-3 2h6c0-1-1-2-3-2z"/></svg>' },
  { name: 'Bướm', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4v16"/><path d="M12 4c-4 0-8 4-8 8s4 8 8 8"/><path d="M12 4c4 0 8 4 8 8s-4 8-8 8"/><path d="M18 4l-2 2"/><path d="M6 4l2 2"/></svg>' },
  { name: 'Ong', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M4 12h16"/><path d="M12 4V2"/><path d="M12 20v2"/><path d="M7 7l-2-2"/><path d="M17 7l2-2"/><path d="M7 17l-2 2"/><path d="M17 17l2 2"/></svg>' },
  { name: 'Ốc sên', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 18h18v2H2z"/><path d="M12 18c0-4.42 3.58-8 8-8v0"/><path d="M12 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M6 4L4 2"/><path d="M8 4L10 2"/></svg>' },
  { name: 'Cáo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12l6-8h6l6 8-6 8H9z"/><path d="M12 12l-3-4"/><path d="M12 12l3-4"/><path d="M9 20l-3-4h12l-3 4"/></svg>' },
  { name: 'Sói', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 4l-8 6 8 10 8-10z"/><path d="M12 4v8l-4 4"/><path d="M12 12l4 4"/><path d="M8 2L4 4"/><path d="M16 2l4 4"/></svg>' },
  { name: 'Dơi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12h20"/><path d="M12 2v20"/><path d="M12 2L2 12l10 10 10-10z"/></svg>' },
  { name: 'Rùa', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-5.52 0-10 4.48-10 10s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 8v8"/><path d="M8 12h8"/><path d="M6 6l-2-2"/><path d="M18 6l2-2"/><path d="M6 18l-2 2"/><path d="M18 18l2 2"/></svg>' },
  { name: 'Hà mã', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10c0-4.42 3.58-8 8-8s8 3.58 8 8v4c0 4.42-3.58 8-8 8s-8-3.58-8-8v-4z"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/><path d="M9 14h6"/></svg>' },
  { name: 'Tê giác', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12h6l2-4 2 4h6v4H4z"/><path d="M8 16v4h2"/><path d="M14 16v4h2"/><path d="M12 8V4"/><circle cx="17" cy="9" r="1"/></svg>' },
  { name: 'Lạc đà', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 18v-8c0-3.31 2.69-6 6-6h4c3.31 0 6 2.69 6 6v8"/><path d="M8 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M16 10a4 4 0 1 1-8 0 4 4 0 0 1 8 0z"/><path d="M4 18h2"/><path d="M18 18h2"/></svg>' },
  { name: 'Cá heo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6z"/><path d="M18 12c0-4 2-6 4-6"/><circle cx="15" cy="11" r="1"/></svg>' },
  { name: 'Cá vàng', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c0-4 4-6 8-6s8 2 8 6-4 6-8 6-8-2-8-6z"/><path d="M18 12l4-2-4-2v4z"/></svg>' },
  { name: 'Kỳ lân', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h3l2-3h4l2 3h3v5l-3 4H8z"/><path d="M8 14v6h2"/><path d="M14 14v6h2"/><path d="M8 5V2"/><path d="M16 5V2"/><path d="M12 2l-1 4h2z"/></svg>' },
  { name: 'Gấu trúc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M16 9a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/></svg>' },
  { name: 'Koala', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M16 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/></svg>' },
  { name: 'Hải cẩu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8-4 8-10 8-10-4-10-8z"/><path d="M10 12h4"/><path d="M12 12l2 2"/><path d="M12 12l-2 2"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/></svg>' },
  { name: 'Chim hồng hạc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"/><path d="M12 10v10"/><path d="M8 20h8"/><path d="M12 10s-4 4-4 8"/></svg>' },
  { name: 'Công', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 12m-3 0a3 3 0 1 0 6 0 3 3 0 1 0-6 0"/><path d="M12 2c5 0 10 5 10 10s-5 10-10 10"/><path d="M2 12c0-5 5-10 10-10"/><path d="M12 15v7"/></svg>' },
  { name: 'Vẹt', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-4 0-7 3-7 7s3 7 7 7 7-3 7-7-3-7-7-7z"/><path d="M12 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/><path d="M12 16a4 4 0 0 0 4-4h-8a4 4 0 0 0 4 4z"/></svg>' },
  { name: 'Kền kền', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-4 0-8 4-8 8v4h16v-4c0-4-4-8-8-8z"/><path d="M12 14v8"/><path d="M9 22h6"/><path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>' },
  { name: 'Chuồn chuồn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M6 8l-4-4"/><path d="M18 8l4-4"/><path d="M6 16l-4 4"/><path d="M18 16l4 4"/></svg>' },
  { name: 'Nhện', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v20"/><path d="M2 12h20"/><path d="M5 5l14 14"/><path d="M19 5l-14 14"/><circle cx="12" cy="12" r="3"/><path d="M12 6V2"/><path d="M12 18v4"/><path d="M6 12H2"/><path d="M18 12h4"/></svg>' },
  { name: 'Bọ cạp', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2 0-4 2-4 4s2 4 4 4 4-2 4-4-2-4-4-4z"/><path d="M12 16v4l2 2"/><path d="M4 12H2"/><path d="M20 12h2"/><path d="M6 10l-2-2"/><path d="M18 10l2-2"/><path d="M6 14l-2 2"/><path d="M18 14l2 2"/></svg>' },
  { name: 'Kiến', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="3"/><circle cx="6" cy="6" r="2"/><circle cx="18" cy="18" r="2"/><path d="M12 15l6 3"/><path d="M12 9L6 6"/><path d="M4 10l-2-2"/><path d="M20 14l2 2"/><path d="M10 4l-2-2"/><path d="M14 20l2 2"/></svg>' },
  { name: 'Thằn lằn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s2-6 8-6 10 4 10 4-2 6-8 6-10-4-10-4z"/><path d="M16 10v6l-4 4"/><path d="M4 14l-2 2"/><path d="M20 10l2-2"/></svg>' },
  { name: 'Ếch', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8v4H4z"/><circle cx="8" cy="10" r="2"/><circle cx="16" cy="10" r="2"/><path d="M6 16v4h2"/><path d="M18 16v4h-2"/></svg>' },
  { name: 'Châu chấu', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"/><path d="M12 16v4"/><path d="M9 20h6"/><path d="M6 8l-2-4"/><path d="M18 8l2-4"/><path d="M8 12L4 8"/><path d="M16 12l4-4"/></svg>' },
  { name: 'Cá sấu Mỹ', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l2-2h16l2 2-2 2H4z"/><path d="M4 14l-2 2h20l-2-2"/><path d="M7 10V8m10 2V8M7 14v2m10-2v2"/><path d="M7 10h10M7 14h10"/></svg>' },
  { name: 'Gấu túi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M16 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M12 12m-2 0a2 2 0 1 0 4 0 2 2 0 1 0-4 0"/></svg>' },
  { name: 'Lười', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M9 10c0-1.66 1.34-3 3-3s3 1.34 3 3"/><path d="M9 14h6"/><path d="M8 18l-4-4"/><path d="M16 18l4-4"/></svg>' },
  { name: 'Hải ly', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8v4h-4v-2h-8v2H4z"/><path d="M9 8h2"/><path d="M13 8h2"/><path d="M8 16h8v2H8z"/></svg>' },
  { name: 'Chuột', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2z"/><path d="M12 12c-2 0-4-2-4-4s2-4 4-4"/><path d="M18 12c-3 4-9 4-12 0"/></svg>' },
  { name: 'Thỏ', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/><path d="M10 2L8 6"/><path d="M14 2l2 6"/><path d="M11 14h2"/><path d="M12 12v2"/></svg>' },
  { name: 'Sóc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4 4-6 8-6s8 2 8 6-4 10-8 10-8-6-8-10z"/><path d="M12 2L8 6"/><path d="M16 18c4 0 6-4 6-8"/></svg>' },
  { name: 'Chồn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8c0 4-4 8-10 8-10 0-10-4-10-8z"/><path d="M12 12c-2 0-4-1-4-2s2-2 4-2 4 1 4 2-2 2-4 2z"/><path d="M21 12H3"/></svg>' },
  { name: 'Lửng', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12c0-4.42 3.58-8 8-8s8 3.58 8 8-3.58 8-8 8-8-3.58-8-8z"/><path d="M4 12h16"/><path d="M12 4v16"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>' },
  { name: 'Dê', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5l-4-3"/><path d="M16 5l4-3"/><path d="M12 2c-3 0-5 2-5 4v2c0 2 2 4 5 4s5-2 5-4V6c0-2-2-4-5-4z"/><path d="M12 12v10"/><path d="M8 22h8"/><path d="M12 16h-1"/></svg>' },
  { name: 'Llama', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4a4 4 0 0 1 4-4 4 4 0 0 1 4 4v10c0 2.21-1.79 4-4 4s-4-1.79-4-4V4z"/><path d="M12 18v4"/><path d="M9 22h6"/><path d="M10 4V2"/><path d="M14 4V2"/></svg>' },
  { name: 'Gấu mèo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 8h8v8H8z"/><path d="M12 12l4 4"/><path d="M12 12l-4 4"/><path d="M18 18l4 4"/></svg>' },
  { name: 'Hải mã', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10c0-4.42 3.58-8 8-8s8 3.58 8 8v4h-4v-2h-8v2H4z"/><path d="M9 8h2"/><path d="M13 8h2"/><path d="M8 14v4"/><path d="M16 14v4"/></svg>' },
  { name: 'Nhím', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2L2 12l10 10 10-10z"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M7 7l-3-3"/><path d="M17 7l3-3"/><path d="M7 17l-3 3"/><path d="M17 17l3 3"/></svg>' },
  { name: 'Kangaroo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 5a4 4 0 0 1 4-4 4 4 0 0 1 4 4v2a4 4 0 0 1-4 4 4 4 0 0 1-4-4V5z"/><path d="M12 9v8"/><path d="M9 17L5 21"/><path d="M15 17l4 4"/><path d="M10 14h4"/><path d="M10 5V3"/><path d="M14 5V3m-6 11H6"/><path d="M14 14h2"/></svg>' },
  { name: 'Ngựa vằn', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5h3l2-3h4l2 3h3v5l-3 4H8z"/><path d="M8 14v6h2"/><path d="M14 14v6h2"/><path d="M8 5V2"/><path d="M16 5V2"/><path d="M3 7h18M3 9h18M3 11h18"/></svg>' },
  { name: 'Chim gõ kiến', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-4 0-7 3-7 7v8h14V9c0-4-3-7-7-7z"/><path d="M12 2v4"/><path d="M12 17v5"/><path d="M9 22h6"/><path d="M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/></svg>' },
  { name: 'Rái cá', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8-4 8-10 8-10-4-10-8z"/><path d="M10 12h4"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M8 14s-2 2 0 2 4-2 4-2"/></svg>' },
  { name: 'Báo', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 6c-3.31 0-6 2.69-6 6s2.69 6 6 6 6-2.69 6-6-2.69-6-6-6z"/><path d="M7 6l-2 2"/><path d="M17 6l2 2"/><path d="M12 15v3"/><path d="M9 18h6"/><circle cx="10" cy="10" r="1"/><circle cx="14" cy="10" r="1"/><circle cx="12" cy="13" r="1"/></svg>' },
  { name: 'Chồn hôi', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8c0 4-4 8-10 8-10 0-10-4-10-8z"/><path d="M12 2v20"/><path d="M12 12c-2 0-4-1-4-2s2-2 4-2 4 1 4 2-2 2-4 2z"/></svg>' },
  { name: 'Lạc đà Alpaca', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8 4a4 4 0 0 1 4-4 4 4 0 0 1 4 4v10c0 2.21-1.79 4-4 4s-4-1.79-4-4V4z"/><path d="M12 18v4"/><path d="M9 22h6"/><path d="M8 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/><path d="M16 6a4 4 0 1 0 0-8 4 4 0 0 0 0 8z"/></svg>' },
  { name: 'Tinh tinh', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"/><path d="M9 4a3 3 0 0 0-3 3v0"/><path d="M15 4a3 3 0 0 1 3 3v0"/><path d="M12 16c-3 0-6 2-6 4h12c0-2-3-4-6-4z"/><path d="M8 12h8"/></svg>' },
  { name: 'Khỉ đột', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 10c0-4.42 3.58-8 8-8s8 3.58 8 8v4h-4v-2h-8v2H4z"/><path d="M12 14c-2 0-4 2-4 4h8c0-2-2-4-4-4z"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>' },
  { name: 'Hồng hạc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"/><path d="M12 10v10"/><path d="M8 20h8"/><path d="M12 10s-4 4-4 8"/></svg>' },
  { name: 'Cá sấu Gharial', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l2-2h16l2 2-2 2H4z"/><path d="M4 14l-2 2h20l-2-2"/><path d="M7 10h10v-2H7z"/><path d="M9 8V6"/><path d="M15 8V6"/></svg>' },
  { name: 'Sứa', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12c0-5.52 4.48-10 10-10s10 4.48 10 10"/><path d="M6 12v8"/><path d="M10 12v8"/><path d="M14 12v8"/><path d="M18 12v8"/></svg>' },
  { name: 'Sao biển', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.31L22 9.27l-5 4.87 1.18 6.88L12 17.27l-6.18 3.73L7 14.14 2 9.27l6.91-1.04L12 2Z"/></svg>' },
  { name: 'Cá ngựa', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c-3 0-5 2-5 4s2 4 5 4 5-2 5-4-2-4-5-4z"/><path d="M12 10v4c0 3 3 4 3 4s-3-1-3-4-2 0-2 4c0 0 1-4 4-4"/></svg>' },
  { name: 'Rái cá biển', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12c0-4 4-8 10-8s10 4 10 8-4 8-10 8-10-4-10-8z"/><path d="M10 12h4"/><circle cx="9" cy="10" r="1"/><circle cx="15" cy="10" r="1"/><path d="M10 14h4v-1h-4z"/></svg>' },
  { name: 'Cá đuối', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12l10 10L22 12 12 2 2 12Z"/><path d="M12 12l8 8"/></svg>' },
  { name: 'Cá nóc', svg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M12 2v20"/><path d="M2 12h20"/><path d="M7 7l-2-2"/><path d="M17 7l2-2"/><path d="M7 17l-2 2"/><path d="M17 17l2 2"/></svg>' },
];

const QUOTE_LIST: string[] = [
  "Cách duy nhất để làm được việc lớn là yêu những gì bạn làm. - Steve Jobs",
  "Cuộc sống là những gì xảy ra khi bạn đang bận rộn lập ra những kế hoạch khác. - John Lennon",
  "Hãy là sự thay đổi mà bạn muốn thấy trên thế giới. - Mahatma Gandhi",
  "Không phải ai lang thang cũng đều đi lạc. - J.R.R. Tolkien",
  "Chỉ có hai điều là vô hạn: vũ trụ và sự ngu ngốc của con người, và tôi không chắc về điều đầu tiên. - Albert Einstein",
  "Bạn chỉ sống một lần, nhưng nếu bạn làm đúng, một lần là đủ. - Mae West",
  "Trong ba từ, tôi có thể tóm tắt mọi thứ tôi đã học về cuộc sống: nó vẫn tiếp diễn. - Robert Frost",
  "Để là chính mình trong một thế giới không ngừng cố gắng biến bạn thành một người khác là thành tựu lớn nhất. - Ralph Waldo Emerson",
  "Tương lai thuộc về những người tin vào vẻ đẹp của những giấc mơ của họ. - Eleanor Roosevelt",
  "Thà bị ghét vì con người thật của bạn, còn hơn được yêu vì con người không phải là bạn. - André Gide",
  "Hành trình ngàn dặm bắt đầu từ một bước chân. - Lão Tử",
  "Cuộc sống không phải là chờ đợi cơn bão qua đi, mà là học cách khiêu vũ dưới mưa. - Vivian Greene",
  "Thành công không phải là chìa khóa của hạnh phúc. Hạnh phúc là chìa khóa của thành công. - Albert Schweitzer",
  "Hãy mơ như thể bạn sẽ sống mãi. Hãy sống như thể bạn sẽ chết hôm nay. - James Dean",
  "Vinh quang lớn nhất của chúng ta không phải là không bao giờ vấp ngã, mà là đứng dậy mỗi khi chúng ta ngã. - Khổng Tử",
  "Hãy bận rộn sống hoặc bận rộn chết. - Stephen King",
  "Tất cả những giấc mơ của chúng ta đều có thể trở thành hiện thực nếu chúng ta có can đảm để theo đuổi chúng. - Walt Disney",
  "Nếu bạn nhìn vào những gì bạn có trong cuộc sống, bạn sẽ luôn có nhiều hơn. Nếu bạn nhìn vào những gì bạn không có, bạn sẽ không bao giờ có đủ. - Oprah Winfrey",
  "Thời gian của bạn có hạn, đừng lãng phí nó để sống cuộc đời của người khác. - Steve Jobs",
  "Thất bại là gia vị mang lại hương vị cho thành công. - Truman Capote",
  "Chỉ những người dám thất bại lớn mới có thể đạt được thành công lớn. - Robert F. Kennedy",
  "Logic sẽ đưa bạn từ A đến B. Trí tưởng tượng sẽ đưa bạn đi khắp mọi nơi. - Albert Einstein",
  "Giáo dục là vũ khí mạnh nhất mà bạn có thể sử dụng để thay đổi thế giới. - Nelson Mandela",
  "Không gì là không thể, bản thân từ đó đã nói 'I'm possible'! - Audrey Hepburn",
  "Người không mắc sai lầm là người không thử làm bất cứ điều gì mới. - Albert Einstein",
  "Hãy giữ khuôn mặt bạn luôn hướng về ánh mặt trời, và bóng tối sẽ đổ lại sau lưng bạn. - Walt Whitman",
  "Một người bạn là người biết tất cả về bạn và vẫn yêu bạn. - Elbert Hubbard",
  "Điều đẹp đẽ nhất chúng ta có thể trải nghiệm là sự bí ẩn. - Albert Einstein",
  "Hãy sống cuộc sống của bạn đến mức trọn vẹn nhất. - Ernest Hemingway",
  "Thử thách là những gì làm cho cuộc sống trở nên thú vị, và vượt qua chúng là những gì làm cho cuộc sống có ý nghĩa. - Joshua J. Marine",
  "Để tránh bị chỉ trích: không nói gì cả, không làm gì cả, không là gì cả. - Aristotle",
  "Tất cả những gì chúng ta phải quyết định là phải làm gì với thời gian được ban cho chúng ta. - J.R.R. Tolkien",
  "Cuộc sống thu hẹp hoặc mở rộng tùy theo lòng can đảm của một người. - Anais Nin",
  "Không có gì cao quý trong việc vượt trội hơn người khác; sự cao quý thực sự nằm ở việc vượt trội hơn chính bản thân mình trước đây. - Ernest Hemingway",
  "Hãy tin rằng bạn có thể và bạn đã đi được nửa đường. - Theodore Roosevelt",
  "Tôi có thể chấp nhận thất bại, mọi người đều thất bại ở một việc gì đó. Nhưng tôi không thể chấp nhận việc không cố gắng. - Michael Jordan",
  "Nếu bạn muốn nâng mình lên, hãy nâng người khác lên. - Booker T. Washington",
  "Những tâm trí vĩ đại thảo luận về ý tưởng; những tâm trí trung bình thảo luận về sự kiện; những tâm trí nhỏ bé thảo luận về con người. - Eleanor Roosevelt",
  "Trở ngại không cần phải ngăn cản bạn. Nếu bạn gặp một bức tường, đừng quay đầu và bỏ cuộc. Hãy tìm cách trèo qua nó, đi xuyên qua nó, hoặc đi vòng qua nó. - Michael Jordan",
  "Bắt đầu từ nơi bạn đứng. Sử dụng những gì bạn có. Làm những gì bạn có thể. - Arthur Ashe",
  "Bạn bỏ lỡ 100% những cú sút bạn không thực hiện. - Wayne Gretzky",
  "Hai mươi năm nữa, bạn sẽ thất vọng về những điều bạn không làm hơn là những điều bạn đã làm. - Mark Twain",
  "Hãy xây dựng giấc mơ của riêng bạn, nếu không người khác sẽ thuê bạn để xây dựng giấc mơ của họ. - Farrah Gray",
  "Mọi thứ bạn từng mong muốn đều nằm ở phía bên kia của sự sợ hãi. - George Addair",
  "Cuộc sống giống như đi xe đạp. Để giữ thăng bằng, bạn phải tiếp tục di chuyển. - Albert Einstein",
  "Hãy sống cuộc đời mà bạn yêu. Hãy yêu cuộc đời mà bạn sống. - Bob Marley",
  "Thành công là đi từ thất bại này đến thất bại khác mà không mất đi lòng nhiệt huyết. - Winston Churchill",
  "Những người đủ điên rồ để nghĩ rằng họ có thể thay đổi thế giới chính là những người làm được điều đó. - Steve Jobs",
  "Cái giá của bất cứ điều gì là lượng sống mà bạn đổi lấy nó. - Henry David Thoreau",
  "Hãy làm điều gì đó hôm nay mà bản thân bạn trong tương lai sẽ cảm ơn. - Sean Patrick Flanery",
  "Đừng chờ đợi. Thời gian sẽ không bao giờ là 'vừa đúng'. - Napoleon Hill",
  "Nếu cơ hội không gõ cửa, hãy xây một cánh cửa. - Milton Berle",
  "Hành động là chìa khóa nền tảng cho mọi thành công. - Pablo Picasso",
  "Chỉ cần nhớ rằng có người ngoài kia hạnh phúc với ít hơn những gì bạn có. - Khuyết danh",
  "Bạn không thể bắt đầu chương tiếp theo của cuộc đời nếu bạn cứ đọc lại chương trước. - Khuyết danh",
  "Đừng bao giờ hối tiếc một ngày nào trong cuộc đời bạn. Những ngày tốt đẹp mang lại hạnh phúc, những ngày tồi tệ mang lại kinh nghiệm, những ngày tồi tệ nhất mang lại bài học, và những ngày tốt nhất mang lại kỷ niệm. - Khuyết danh",
  "Sự khác biệt giữa bình thường và phi thường là một chút 'thêm' đó. - Jimmy Johnson",
  "Hãy là một giọng nói, không phải là một tiếng vọng. - Khuyết danh",
  "Hãy làm việc chăm chỉ trong im lặng, hãy để thành công của bạn lên tiếng. - Frank Ocean",
  "Đôi khi chúng ta được thử thách không phải để thể hiện điểm yếu của mình, mà là để khám phá sức mạnh của mình. - Khuyết danh",
  "Hạnh phúc không phải là một điểm đến, nó là một cách sống. - Burton Hills",
  "Những điều tốt đẹp đến với những người chờ đợi, nhưng những điều tốt hơn đến với những người nỗ lực và làm bất cứ điều gì để có được chúng. - Khuyết danh",
  "Can đảm không phải là không có sợ hãi, mà là khả năng hành động bất chấp sợ hãi. - Khuyết danh",
  "Bạn không thể có một ngày mai tốt đẹp hơn nếu bạn vẫn đang nghĩ về ngày hôm qua. - Charles F. Kettering",
  "Hãy là người mà bạn cần khi bạn còn trẻ. - Khuyết danh",
  "Cuộc sống không có điều khiển từ xa, bạn phải đứng dậy và tự mình thay đổi nó. - Khuyết danh",
  "Nếu bạn không thích điều gì đó, hãy thay đổi nó. Nếu bạn không thể thay đổi nó, hãy thay đổi thái độ của bạn. - Maya Angelou",
  "Đừng đánh giá mỗi ngày bằng những gì bạn gặt hái được, mà bằng những hạt giống bạn đã gieo. - Robert Louis Stevenson",
  "Hãy yêu tất cả, tin tưởng một vài người, làm sai không ai cả. - William Shakespeare",
  "Cách tốt nhất để dự đoán tương lai là tạo ra nó. - Peter Drucker",
  "Hãy là phiên bản hạng nhất của chính bạn, không phải là phiên bản hạng hai của người khác. - Judy Garland",
  "Một cuộc sống không được kiểm nghiệm thì không đáng sống. - Socrates",
  "Hãy cứ đói khát, hãy cứ dại khờ. - Steve Jobs",
  "Đừng để ngày hôm qua chiếm quá nhiều của ngày hôm nay. - Will Rogers",
  "Một con tàu trong bến cảng thì an toàn, nhưng đó không phải là mục đích của những con tàu. - John A. Shedd",
  "Bạn càng đọc nhiều, bạn càng biết nhiều. Bạn càng học nhiều, bạn càng đi nhiều nơi. - Dr. Seuss",
  "Mọi thứ đều có vẻ đẹp, nhưng không phải ai cũng thấy được nó. - Khổng Tử",

];


const UPPERCASE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const LOWERCASE_CHARS = 'abcdefghijklmnopqrstuvwxyz';
const NUMBER_CHARS = '0123456789';
const SYMBOL_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?';


// --- Helper Components ---
type PageContainerProps = {
  children?: React.ReactNode;
  title: string;
  onBack: () => void;
};
const PageContainer = ({ children, title, onBack }: PageContainerProps) => (
  <div className="p-4 sm:p-6 md:p-8 max-w-4xl mx-auto animate-fade-in">
    <button
      onClick={onBack}
      className="mb-6 bg-white/50 hover:bg-white/80 text-lime-800 font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg flex items-center"
      aria-label="Quay lại trang chủ"
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
      </svg>
      Trang chủ
    </button>
    <h1 className="text-4xl sm:text-5xl font-bold text-lime-900 text-center mb-8 text-shadow-sm">{title}</h1>
    {children}
  </div>
);


// --- Advice App ---
const AdviceApp = ({ onBack }: { onBack: () => void }) => {
  const [advice, setAdvice] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewAdvice = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * ADVICE_LIST.length);
    setAdvice(ADVICE_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewAdvice();
  }, [getNewAdvice]);

  return (
    <PageContainer title="Lời Khuyên Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-lime-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {advice && (
            <p key={key} className="text-xl sm:text-2xl text-lime-800 font-medium animate-fade-in text-shadow-sm">
              "{advice}"
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewAdvice}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300"
            aria-label="Nhận một lời khuyên mới"
          >
            Lời khuyên khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};


// --- Pixel Art App ---
const PixelArtApp = ({ onBack }: { onBack: () => void }) => {
  const GRID_SIZE = 16;
  const [pixels, setPixels] = useState<string[]>([]);

  const generatePixels = useCallback(() => {
    const newPixels = new Array(GRID_SIZE * GRID_SIZE).fill('');
    for (let y = 0; y < GRID_SIZE; y++) {
      for (let x = 0; x < Math.ceil(GRID_SIZE / 2); x++) {
        const color = PIXEL_ART_COLORS[Math.floor(Math.random() * PIXEL_ART_COLORS.length)];
        newPixels[y * GRID_SIZE + x] = color;
        newPixels[y * GRID_SIZE + (GRID_SIZE - 1 - x)] = color;
      }
    }
    setPixels(newPixels);
  }, []);

  useEffect(() => {
    generatePixels();
  }, [generatePixels]);

  return (
    <PageContainer title="Vẽ Hình Pixel Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-lime-200/50">
        <div
            className="grid aspect-square w-full max-w-lg mx-auto overflow-hidden rounded-lg shadow-inner"
            style={{ gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)` }}
            aria-label="Pixel art grid"
        >
          {pixels.map((color, index) => (
            <div
              key={index}
              className="w-full h-full"
              style={{ backgroundColor: color, paddingTop: '100%' }}
              aria-label={`Pixel ${index + 1} with color ${color}`}
            />
          ))}
        </div>
        <p className="text-center text-lime-700 mt-6 text-sm sm:text-base">Mỗi lần nhấn là một tác phẩm nghệ thuật đối xứng mới!</p>
         <div className="mt-6 text-center">
          <button
            onClick={generatePixels}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300"
            aria-label="Tạo một ảnh pixel mới"
          >
            Tạo ảnh mới
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Story App ---
const StoryApp = ({ onBack }: { onBack: () => void }) => {
  const [story, setStory] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewStory = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * STORY_LIST.length);
    setStory(STORY_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewStory();
  }, [getNewStory]);

  return (
    <PageContainer title="Kể Chuyện Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-yellow-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-yellow-200/50">
        <div className="text-center min-h-[150px] flex items-center justify-center p-4">
          {story && (
            <p key={key} className="text-lg sm:text-xl text-yellow-900 font-serif leading-relaxed animate-fade-in">
              {story}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewStory}
            className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-300"
            aria-label="Nghe một câu chuyện mới"
          >
            Kể chuyện khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Helper function for color contrast ---
const getContrastingTextColor = (hex: string): string => {
  if (!hex.startsWith('#') || hex.length < 7) return '#000000';
  const r = parseInt(hex.substring(1, 3), 16);
  const g = parseInt(hex.substring(3, 5), 16);
  const b = parseInt(hex.substring(5, 7), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? '#000000' : '#ffffff';
};

// --- Color Palette App ---
const ColorPaletteApp = ({ onBack }: { onBack: () => void }) => {
  const [palette, setPalette] = useState<string[]>([]);
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const timeoutRef = useRef<number | null>(null);

  const generateRandomColor = useCallback(() => {
    return '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
  }, []);

  const generateNewPalette = useCallback(() => {
    const newPalette = Array.from({ length: 5 }, generateRandomColor);
    setPalette(newPalette);
  }, [generateRandomColor]);

  useEffect(() => {
    generateNewPalette();
    // Cleanup timeout on unmount
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [generateNewPalette]);

  const handleCopy = (color: string) => {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(color.toUpperCase()).then(() => {
        setCopiedColor(color);
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        timeoutRef.current = window.setTimeout(() => setCopiedColor(null), 2000);
      });
    }
  };

  return (
    <PageContainer title="Máy Tạo Màu Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-white/70 backdrop-blur-sm p-4 sm:p-6 rounded-2xl shadow-lg border border-lime-200/50">
        <div className="flex flex-col sm:flex-row h-96 w-full max-w-lg mx-auto rounded-lg overflow-hidden shadow-inner">
          {palette.map((color, index) => (
            <div
              key={index}
              className="flex-1 flex flex-col justify-end items-center p-4 text-center transition-all duration-300"
              style={{ backgroundColor: color }}
              aria-label={`Color swatch ${color}`}
            >
              <button
                onClick={() => handleCopy(color)}
                className="font-mono text-base sm:text-lg p-2 rounded-md transition-all duration-200"
                style={{
                  color: getContrastingTextColor(color),
                  backgroundColor: 'rgba(255, 255, 255, 0.2)',
                }}
                aria-live="polite"
              >
                {copiedColor === color ? 'Đã sao chép!' : color.toUpperCase()}
              </button>
            </div>
          ))}
        </div>
        <p className="text-center text-lime-700 mt-6 text-sm sm:text-base">Nhấn vào mã màu để sao chép.</p>
        <div className="mt-6 text-center">
          <button
            onClick={generateNewPalette}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300"
            aria-label="Tạo một bảng màu mới"
          >
            Tạo bảng màu mới
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Dice App ---
const Pip = () => <span className="block w-4 h-4 sm:w-6 sm:h-6 bg-lime-800 rounded-full" />;

// Fix: Explicitly type the Die component with React.FC to allow React-specific props like 'key' in loops, resolving the TypeScript error.
type DieProps = {
  value: number;
};
const Die: React.FC<DieProps> = ({ value }) => {
  const dotPositions: { [key: number]: number[] } = {
    1: [5], 2: [1, 9], 3: [1, 5, 9], 4: [1, 3, 7, 9], 5: [1, 3, 5, 7, 9], 6: [1, 3, 4, 6, 7, 9],
  };
  const dots = Array(9).fill(0).map((_, i) => (
    <div key={i} className="flex justify-center items-center">
      {dotPositions[value]?.includes(i + 1) && <Pip />}
    </div>
  ));

  return (
    <div className="w-20 h-20 sm:w-28 sm:h-28 bg-white rounded-lg shadow-md p-2 grid grid-cols-3 grid-rows-3 transition-all duration-50" aria-label={`Die showing ${value}`}>
      {dots}
    </div>
  );
};

const DiceApp = ({ onBack }: { onBack: () => void }) => {
  const [dice, setDice] = useState<number[]>([1, 6]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const rollDice = useCallback(() => {
    if (isRolling) return;

    setIsRolling(true);
    let rollCount = 0;
    const finalDice = [
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
    ];

    intervalRef.current = window.setInterval(() => {
      setDice([
        Math.floor(Math.random() * 6) + 1,
        Math.floor(Math.random() * 6) + 1,
      ]);
      rollCount++;
      if (rollCount >= 10) { 
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDice(finalDice);
        setIsRolling(false);
      }
    }, 100);
  }, [isRolling]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const total = dice.reduce((sum, val) => sum + val, 0);

  return (
    <PageContainer title="Gieo Xúc Xắc Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-lime-200/50">
        <div className="flex justify-center items-center gap-4 sm:gap-8 min-h-[150px]">
          {dice.map((value, index) => (
            <Die key={index} value={value} />
          ))}
        </div>
        <div className="text-center mt-6 h-12 flex justify-center items-center">
          {!isRolling ? (
            <p className="text-3xl sm:text-4xl text-lime-800 font-bold animate-fade-in text-shadow-sm">
              Tổng: {total}
            </p>
          ) : (
            <p className="text-2xl sm:text-3xl text-lime-600 font-semibold animate-pulse">
              ...
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={rollDice}
            disabled={isRolling}
            className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300 disabled:bg-lime-400 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Gieo một cặp xúc xắc mới"
          >
            {isRolling ? 'Đang gieo...' : 'Gieo xúc xắc!'}
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Coin Flip App ---
const HeadIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 sm:w-12 sm:h-12 text-yellow-800" viewBox="0 0 20 20" fill="currentColor">
    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
  </svg>
);
const TailIcon = () => (
  <span className="text-4xl sm:text-5xl font-bold text-yellow-800">1</span>
);
// Fix: Explicitly type the Coin component with React.FC to allow React-specific props like 'key' in loops, resolving the TypeScript error.
type CoinProps = {
  side: string;
};
const Coin: React.FC<CoinProps> = ({ side }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-yellow-400 rounded-full flex justify-center items-center shadow-lg border-4 border-yellow-600">
          {side === 'Sấp' ? <HeadIcon /> : <TailIcon />}
      </div>
      <p className="mt-3 text-lg font-semibold text-lime-800">{side}</p>
    </div>
  );
};

const CoinFlipApp = ({ onBack }: { onBack: () => void }) => {
  const SIDES = ['Sấp', 'Ngửa'];
  const [results, setResults] = useState<string[]>(['Sấp', 'Sấp', 'Sấp']);
  const [isFlipping, setIsFlipping] = useState<boolean>(true);
  const intervalRef = useRef<number | null>(null);

  const flipCoins = useCallback(() => {
    setIsFlipping(true);
    let flipCount = 0;
    const finalResults = Array(3).fill(null).map(() => SIDES[Math.floor(Math.random() * 2)]);

    intervalRef.current = window.setInterval(() => {
      setResults(Array(3).fill(null).map(() => SIDES[Math.floor(Math.random() * 2)]));
      flipCount++;
      if (flipCount >= 10) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setResults(finalResults);
        setIsFlipping(false);
      }
    }, 100);
  }, []); 
  
  useEffect(() => {
      flipCoins();

      return () => {
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
          }
      };
  }, [flipCoins]);
  
  const headsCount = results.filter(r => r === 'Sấp').length;
  const tailsCount = 3 - headsCount;
  const summary = `Kết quả: ${headsCount} Sấp, ${tailsCount} Ngửa`;

  return (
      <PageContainer title="Tung Đồng Xu Ngẫu Nhiên" onBack={onBack}>
          <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-lime-200/50">
              <div className="flex justify-around items-center min-h-[150px]">
                  {results.map((side, index) => <Coin key={index} side={side} />)}
              </div>
              <div className="text-center mt-6 h-12 flex justify-center items-center">
                  {!isFlipping ? (
                      <p className="text-2xl sm:text-3xl text-lime-800 font-bold animate-fade-in text-shadow-sm">
                          {summary}
                      </p>
                  ) : (
                      <p className="text-xl sm:text-2xl text-lime-600 font-semibold animate-pulse">
                          ...
                      </p>
                  )}
              </div>
              <div className="mt-8 text-center">
                  <button
                      onClick={flipCoins}
                      disabled={isFlipping}
                      className="bg-lime-600 hover:bg-lime-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-lime-300 disabled:bg-lime-400 disabled:cursor-not-allowed disabled:transform-none"
                      aria-label="Tung ba đồng xu mới"
                  >
                      {isFlipping ? 'Đang tung...' : 'Tung đồng xu!'}
                  </button>
              </div>
          </div>
      </PageContainer>
  );
};

// --- Guess the Number App ---
const GuessNumberApp = ({ onBack }: { onBack: () => void }) => {
    const [secretNumber, setSecretNumber] = useState(0);
    const [guess, setGuess] = useState('');
    const [feedback, setFeedback] = useState('');
    const [guessCount, setGuessCount] = useState(0);
    const [isGameOver, setIsGameOver] = useState(false);
    const [feedbackKey, setFeedbackKey] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const startNewGame = useCallback(() => {
        setSecretNumber(Math.floor(Math.random() * 100) + 1);
        setGuess('');
        setFeedback('Hãy đoán một số từ 1 đến 100.');
        setGuessCount(0);
        setIsGameOver(false);
        setFeedbackKey(k => k + 1);
        inputRef.current?.focus();
    }, []);

    useEffect(() => {
        startNewGame();
    }, [startNewGame]);

    const handleGuess = (e: React.FormEvent) => {
        e.preventDefault();
        if (isGameOver || !guess) return;

        const numGuess = parseInt(guess, 10);
        if (isNaN(numGuess) || numGuess < 1 || numGuess > 100) {
            setFeedback('Vui lòng nhập một số hợp lệ từ 1 đến 100.');
            setFeedbackKey(k => k + 1);
            return;
        }

        const newGuessCount = guessCount + 1;
        setGuessCount(newGuessCount);

        let newFeedback = '';
        if (numGuess < secretNumber) {
            newFeedback = 'Cao hơn!';
        } else if (numGuess > secretNumber) {
            newFeedback = 'Thấp hơn!';
        } else {
            newFeedback = `Chính xác! Bạn đã đoán đúng sau ${newGuessCount} lần thử.`;
            setIsGameOver(true);
        }
        setFeedback(newFeedback);
        setGuess('');
        setFeedbackKey(k => k + 1);
        inputRef.current?.focus();
    };

    return (
        <PageContainer title="Đoán Số Ngẫu Nhiên" onBack={onBack}>
            <div className="bg-fuchsia-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-fuchsia-200/50 max-w-lg mx-auto">
                <div className="text-center min-h-[90px] flex items-center justify-center p-4">
                    <p key={feedbackKey} className="text-2xl sm:text-3xl text-fuchsia-800 font-bold animate-fade-in text-shadow-sm">
                        {feedback}
                    </p>
                </div>

                <div className="text-center mb-6">
                    <p className="text-lg text-fuchsia-700">Số lần đoán: <span className="font-bold">{guessCount}</span></p>
                </div>

                {isGameOver ? (
                    <div className="mt-4 text-center">
                        <button
                            onClick={startNewGame}
                            className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-fuchsia-300"
                            aria-label="Bắt đầu trò chơi mới"
                        >
                            Chơi lại
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleGuess} className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <input
                            ref={inputRef}
                            type="number"
                            min="1"
                            max="100"
                            value={guess}
                            onChange={(e) => setGuess(e.target.value)}
                            className="w-full sm:w-40 text-center text-xl font-bold p-3 border-2 border-fuchsia-200 rounded-lg shadow-inner focus:border-fuchsia-500 focus:ring-fuchsia-500 transition-all"
                            placeholder="?"
                            aria-label="Nhập số bạn đoán"
                            autoFocus
                        />
                        <button
                            type="submit"
                            disabled={!guess}
                            className="w-full sm:w-auto bg-fuchsia-600 hover:bg-fuchsia-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-fuchsia-300 disabled:bg-fuchsia-400 disabled:cursor-not-allowed disabled:transform-none"
                            aria-label="Gửi số bạn đoán"
                        >
                            Đoán!
                        </button>
                    </form>
                )}
            </div>
        </PageContainer>
    );
};

// --- Location App ---
const LocationApp = ({ onBack }: { onBack: () => void }) => {
  const [location, setLocation] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewLocation = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * LOCATION_LIST.length);
    setLocation(LOCATION_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewLocation();
  }, [getNewLocation]);

  return (
    <PageContainer title="Địa Điểm Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-cyan-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-cyan-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {location && (
            <p key={key} className="text-xl sm:text-2xl text-cyan-800 font-medium animate-fade-in text-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 mr-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              {location}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewLocation}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cyan-300"
            aria-label="Xem một địa điểm ngẫu nhiên"
          >
            Xem ngẫu nhiên
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Sound App ---
const SoundApp = ({ onBack }: { onBack: () => void }) => {
  const [sound, setSound] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewSound = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SOUND_LIST.length);
    setSound(SOUND_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewSound();
  }, [getNewSound]);

  return (
    <PageContainer title="Âm Thanh Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-indigo-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-indigo-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {sound && (
            <p key={key} className="text-xl sm:text-2xl text-indigo-800 font-medium animate-fade-in text-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-7 w-7 mr-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
              </svg>
              {sound}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewSound}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-indigo-300"
            aria-label="Ghi ra một âm thanh ngẫu nhiên"
          >
            Ghi ra âm thanh
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Song App ---
const SongApp = ({ onBack }: { onBack: () => void }) => {
  const [song, setSong] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewSong = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SONG_LIST.length);
    setSong(SONG_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewSong();
  }, [getNewSong]);

  return (
    <PageContainer title="Bài Nhạc Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-rose-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-rose-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {song && (
            <p key={key} className="text-xl sm:text-2xl text-rose-800 font-medium animate-fade-in text-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 mr-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3V3z" />
              </svg>
              {song}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewSong}
            className="bg-rose-600 hover:bg-rose-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-rose-300"
            aria-label="Ra tên một bài nhạc ngẫu nhiên"
          >
            Ra tên bài nhạc
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Fact App ---
const FactApp = ({ onBack }: { onBack: () => void }) => {
  const [fact, setFact] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewFact = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * FACT_LIST.length);
    setFact(FACT_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewFact();
  }, [getNewFact]);

  return (
    <PageContainer title="Sự Thật Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-teal-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-teal-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {fact && (
            <p key={key} className="text-xl sm:text-2xl text-teal-800 font-medium animate-fade-in text-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 mr-2 -mt-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.121-3.536a1 1 0 010 1.414l-.707.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM10 16a1 1 0 100 2 1 1 0 000-2zM3.05 11.536a1 1 0 010-1.414l.707-.707a1 1 0 111.414 1.414l-.707.707a1 1 0 01-1.414 0zm.707-7.072a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414-1.414l-.707-.707z" />
              </svg>
              {fact}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewFact}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-teal-300"
            aria-label="Xem một sự thật ngẫu nhiên"
          >
            Sự thật khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Emoji App ---
const EmojiApp = ({ onBack }: { onBack: () => void }) => {
  const [emoji, setEmoji] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewEmoji = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * EMOJI_LIST.length);
    setEmoji(EMOJI_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewEmoji();
  }, [getNewEmoji]);

  return (
    <PageContainer title="Bộ Tạo Biểu Cảm Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-sky-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-sky-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {emoji && (
            <div key={key} className="text-7xl sm:text-8xl animate-fade-in" aria-label="Biểu cảm ngẫu nhiên">
              {emoji}
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewEmoji}
            className="bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-sky-300"
            aria-label="Tạo một biểu cảm ngẫu nhiên mới"
          >
            Tạo Biểu Cảm Mới
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Password Generator App ---
const PasswordApp = ({ onBack }: { onBack: () => void }) => {
    const [password, setPassword] = useState('');
    const [length, setLength] = useState(16);
    const [options, setOptions] = useState({
        uppercase: true,
        lowercase: true,
        numbers: true,
        symbols: false,
    });
    const [copied, setCopied] = useState(false);
    const timeoutRef = useRef<number | null>(null);

    const generatePassword = useCallback(() => {
        let charset = '';
        if (options.uppercase) charset += UPPERCASE_CHARS;
        if (options.lowercase) charset += LOWERCASE_CHARS;
        if (options.numbers) charset += NUMBER_CHARS;
        if (options.symbols) charset += SYMBOL_CHARS;

        if (charset === '') {
            setPassword('Chọn ít nhất 1 loại ký tự');
            return;
        }

        let newPassword = '';
        for (let i = 0; i < length; i++) {
            newPassword += charset.charAt(Math.floor(Math.random() * charset.length));
        }
        setPassword(newPassword);
        setCopied(false);
    }, [length, options]);

    useEffect(() => {
        generatePassword();
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, [generatePassword]);

    const handleCopy = () => {
        if (navigator.clipboard && password.length > 0) {
            navigator.clipboard.writeText(password).then(() => {
                setCopied(true);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = window.setTimeout(() => setCopied(false), 2000);
            });
        }
    };

    const handleOptionChange = (option: keyof typeof options) => {
        setOptions(prev => ({ ...prev, [option]: !prev[option] }));
    };

    return (
        <PageContainer title="Tạo Mật Khẩu Ngẫu Nhiên" onBack={onBack}>
            <div className="bg-slate-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200/50 max-w-lg mx-auto">
                <div className="relative bg-slate-200/50 p-4 rounded-lg flex items-center mb-6 shadow-inner">
                    <span className="flex-grow font-mono text-xl sm:text-2xl text-slate-800 break-all pr-12">{password}</span>
                    <button onClick={handleCopy} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-slate-300 hover:bg-slate-400 transition-all" aria-label="Sao chép mật khẩu">
                        {copied ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        )}
                    </button>
                </div>

                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <label htmlFor="length" className="text-slate-700 font-medium">Độ dài mật khẩu:</label>
                        <span className="text-slate-900 font-bold text-lg">{length}</span>
                    </div>
                    <input id="length" type="range" min="6" max="32" value={length} onChange={(e) => setLength(parseInt(e.target.value, 10))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-slate-600" />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                        {Object.keys(options).map((option) => (
                             <label key={option} className="flex items-center space-x-3 cursor-pointer">
                                <input type="checkbox" checked={options[option as keyof typeof options]} onChange={() => handleOptionChange(option as keyof typeof options)} className="w-5 h-5 text-slate-600 bg-gray-100 border-gray-300 rounded focus:ring-slate-500" />
                                <span className="text-slate-700">{
                                    { uppercase: 'Chữ hoa (A-Z)', lowercase: 'Chữ thường (a-z)', numbers: 'Số (0-9)', symbols: 'Ký tự đặc biệt (!@#$)' }[option]
                                }</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <button onClick={generatePassword} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-300" aria-label="Tạo mật khẩu mới">
                        Tạo mật khẩu mới
                    </button>
                </div>
            </div>
        </PageContainer>
    );
};

// --- Website App ---
const WebsiteApp = ({ onBack }: { onBack: () => void }) => {
  const [website, setWebsite] = useState<Website | null>(null);
  const [key, setKey] = useState<number>(0);

  const getNewWebsite = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * WEBSITE_LIST.length);
    setWebsite(WEBSITE_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewWebsite();
  }, [getNewWebsite]);

  return (
    <PageContainer title="Website Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-blue-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-blue-200/50">
        <div className="text-center min-h-[150px] flex flex-col items-center justify-center p-4">
          {website && (
            <div key={key} className="animate-fade-in">
                <h2 className="text-2xl sm:text-3xl font-bold text-blue-900 mb-3 text-shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-7 w-7 mr-2 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                    </svg>
                    {website.name}
                </h2>
                <p className="text-lg sm:text-xl text-blue-800">
                    {website.description}
                </p>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewWebsite}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-blue-300"
            aria-label="Xem một website ngẫu nhiên khác"
          >
            Xem website khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Decision App ---
const DecisionApp = ({ onBack }: { onBack: () => void }) => {
  const [decision, setDecision] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewDecision = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * DECISION_LIST.length);
    setDecision(DECISION_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewDecision();
  }, [getNewDecision]);

  return (
    <PageContainer title="Quyết Định Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-purple-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-purple-200/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {decision && (
            <p key={key} className="text-xl sm:text-2xl text-purple-800 font-medium animate-fade-in text-shadow-sm">
              "{decision}"
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewDecision}
            className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-purple-300"
            aria-label="Đưa ra một quyết định ngẫu nhiên mới"
          >
            Quyết định khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Slot Machine App ---
const SLOT_SYMBOLS = [
  '🍒', '🍋', '🍊', '🍉', '🔔', '⭐', '💎', '🍀',
  '🍒', '🍋', '🍊', '🍉', '🔔', '⭐', '💎',
  '🍒', '🍋', '🍊', '🍉', '🔔', '⭐',
  '🍒', '🍋', '🍊', '🍉',
  '7️⃣' 
];

const getRandomSymbol = () => SLOT_SYMBOLS[Math.floor(Math.random() * SLOT_SYMBOLS.length)];

type ReelProps = {
  symbol: string;
  spinning: boolean;
};

const Reel: React.FC<ReelProps> = ({ symbol, spinning }) => (
  <div className={`w-24 h-32 sm:w-28 sm:h-36 bg-white/80 rounded-lg shadow-inner flex items-center justify-center transition-all duration-300 ${spinning ? 'blur-sm' : ''}`}>
    <span className="text-5xl sm:text-6xl animate-fade-in">{symbol}</span>
  </div>
);

const SlotMachineApp = ({ onBack }: { onBack: () => void }) => {
  const [reels, setReels] = useState<string[]>(['🍒', '🍋', '🍊']);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [resultMessage, setResultMessage] = useState<string>('Nhấn nút để quay!');
  const spinIntervals = useRef<number[]>([]);

  const handleSpin = useCallback(() => {
    if (isSpinning) return;

    setIsSpinning(true);
    setResultMessage('');
    
    const finalReels = [getRandomSymbol(), getRandomSymbol(), getRandomSymbol()];

    spinIntervals.current.forEach(clearInterval);
    spinIntervals.current = [];

    for (let i = 0; i < 3; i++) {
      spinIntervals.current[i] = window.setInterval(() => {
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[i] = getRandomSymbol();
          return newReels;
        });
      }, 80);
    }
    
    for (let i = 0; i < 3; i++) {
      setTimeout(() => {
        clearInterval(spinIntervals.current[i]);
        setReels(prevReels => {
          const newReels = [...prevReels];
          newReels[i] = finalReels[i];
          return newReels;
        });
        
        if (i === 2) {
            setIsSpinning(false);
            const [r1, r2, r3] = finalReels;
            if (r1 === '7️⃣' && r2 === '7️⃣' && r3 === '7️⃣') {
                setResultMessage('🎉 JACKPOT! 777! 🎉');
            } else if (r1 === r2 && r2 === r3) {
                setResultMessage(`🎊 Thắng lớn! 3 ${r1} 🎊`);
            } else if (r1 === r2 || r2 === r3) {
                setResultMessage('👍 Thắng nhỏ! 👍');
            } else {
                setResultMessage('😭 Chúc bạn may mắn lần sau! 😭');
            }
        }
      }, 1000 + i * 500);
    }
  }, [isSpinning]);

  useEffect(() => {
    return () => spinIntervals.current.forEach(clearInterval);
  }, []);

  return (
    <PageContainer title="Máy Quay Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-gradient-to-b from-purple-500 to-indigo-600 p-6 sm:p-8 rounded-2xl shadow-lg border-4 border-yellow-400 max-w-lg mx-auto">
        <div className="flex justify-center items-center gap-4 sm:gap-6 mb-6">
          <Reel symbol={reels[0]} spinning={isSpinning} />
          <Reel symbol={reels[1]} spinning={isSpinning} />
          <Reel symbol={reels[2]} spinning={isSpinning} />
        </div>
        
        <div className="text-center min-h-[50px] flex items-center justify-center mb-6">
            <p className="text-2xl sm:text-3xl text-white font-bold animate-fade-in text-shadow-sm" aria-live="polite">
                {resultMessage}
            </p>
        </div>

        <div className="text-center">
          <button
            onClick={handleSpin}
            disabled={isSpinning}
            className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-red-300 disabled:bg-gray-500 disabled:cursor-not-allowed disabled:transform-none text-2xl"
            aria-label="Quay máy"
          >
            {isSpinning ? 'Đang quay...' : 'Quay!'}
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Movie App ---
const MovieApp = ({ onBack }: { onBack: () => void }) => {
  const [movie, setMovie] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewMovie = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * MOVIE_LIST.length);
    setMovie(MOVIE_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewMovie();
  }, [getNewMovie]);

  return (
    <PageContainer title="Phim Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-gray-800/80 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-gray-600/50">
        <div className="text-center min-h-[100px] flex items-center justify-center p-4">
          {movie && (
            <p key={key} className="text-xl sm:text-2xl text-yellow-300 font-semibold font-serif animate-fade-in text-shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="inline-block h-6 w-6 mr-3 -mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
              </svg>
              {movie}
            </p>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewMovie}
            className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-yellow-300"
            aria-label="Xem một phim ngẫu nhiên khác"
          >
            Đề xuất phim khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};


// --- Symbol App ---
const SymbolApp = ({ onBack }: { onBack: () => void }) => {
  const [symbol, setSymbol] = useState<{ name: string; svg: string; } | null>(null);
  const [key, setKey] = useState<number>(0);

  const getNewSymbol = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * SYMBOL_LIST.length);
    setSymbol(SYMBOL_LIST[randomIndex]);
    setKey(k => k + 1);
  }, []);

  useEffect(() => {
    getNewSymbol();
  }, [getNewSymbol]);

  return (
    <PageContainer title="Kí Hiệu Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-green-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-green-200/50">
        <div className="text-center min-h-[250px] flex flex-col items-center justify-center p-4">
          {symbol && (
            <div key={key} className="animate-fade-in flex flex-col items-center justify-center">
              <div
                className="w-40 h-40 sm:w-48 sm:h-48 text-green-800"
                dangerouslySetInnerHTML={{ __html: symbol.svg.replace(/width=".*?"/, '').replace(/height=".*?"/, '') }}
              />
              <h2 className="text-2xl sm:text-3xl font-bold text-green-900 mt-4 text-shadow-sm">
                {symbol.name}
              </h2>
            </div>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewSymbol}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-green-300"
            aria-label="Xem một kí hiệu ngẫu nhiên khác"
          >
            Xem kí hiệu khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Random Number Clicker App ---
const RandomNumberApp = ({ onBack }: { onBack: () => void }) => {
  const [number, setNumber] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<number | null>(null);

  const startGenerator = useCallback(() => {
    if (isRunning) return;
    setIsRunning(true);
    intervalRef.current = window.setInterval(() => {
      setNumber(Math.floor(Math.random() * 100) + 1);
    }, 50);
  }, [isRunning]);

  const stopGenerator = useCallback(() => {
    if (!isRunning) return;
    setIsRunning(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, [isRunning]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <PageContainer title="Bấm Số Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-orange-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-orange-200/50 max-w-lg mx-auto">
        <div className="bg-white/50 w-full h-40 sm:h-48 flex items-center justify-center rounded-lg shadow-inner mb-8">
          <span className="text-7xl sm:text-8xl font-bold text-orange-800 tabular-nums">
            {number}
          </span>
        </div>
        <div className="flex justify-center items-center gap-4">
          <button
            onClick={startGenerator}
            disabled={isRunning}
            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-orange-300 disabled:bg-orange-400 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Bắt đầu chạy số"
          >
            Bắt đầu
          </button>
          <button
            onClick={stopGenerator}
            disabled={!isRunning}
            className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-slate-300 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:transform-none"
            aria-label="Dừng chạy số"
          >
            Dừng
          </button>
        </div>
      </div>
    </PageContainer>
  );
};

// --- Quote App ---
const QuoteApp = ({ onBack }: { onBack: () => void }) => {
  const [quote, setQuote] = useState<string>('');
  const [key, setKey] = useState<number>(0);

  const getNewQuote = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * QUOTE_LIST.length);
    setQuote(QUOTE_LIST[randomIndex]);
    setKey(prevKey => prevKey + 1);
  }, []);

  useEffect(() => {
    getNewQuote();
  }, [getNewQuote]);

  const [mainQuote, author] = quote.split(' - ');

  return (
    <PageContainer title="Danh Ngôn Ngẫu Nhiên" onBack={onBack}>
      <div className="bg-stone-50/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-stone-200/50">
        <div className="text-center min-h-[150px] flex items-center justify-center p-4">
          {quote && (
            <figure key={key} className="animate-fade-in">
              <blockquote className="text-xl sm:text-2xl text-stone-800 font-serif italic">
                “{mainQuote}”
              </blockquote>
              {author && (
                <figcaption className="mt-4 text-lg text-stone-600">
                  — {author}
                </figcaption>
              )}
            </figure>
          )}
        </div>
        <div className="mt-8 text-center">
          <button
            onClick={getNewQuote}
            className="bg-stone-600 hover:bg-stone-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-stone-300"
            aria-label="Xem một danh ngôn ngẫu nhiên khác"
          >
            Xem danh ngôn khác
          </button>
        </div>
      </div>
    </PageContainer>
  );
};


// --- Privacy Policy Page ---
const PrivacyPolicyPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <PageContainer title="Chính Sách Quyền Riêng Tư" onBack={onBack}>
      <div className="bg-white/70 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-lg border border-lime-200/50 text-lime-800 text-left space-y-4 prose max-w-none">
        <p className="text-sm">Cập nhật lần cuối: 13 tháng 10 năm 2025</p>
        <p>
          Nguyễn Thành Đạt ("chúng tôi") tôn trọng quyền riêng tư của người dùng ("bạn"). Chính sách này giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin của bạn khi bạn sử dụng ứng dụng web "Sự Ngẫu Nhiên" của chúng tôi.
        </p>

        <h2 className="text-2xl font-bold text-lime-900 pt-4">Dữ liệu được thu thập</h2>
        <p>
          Ứng dụng này được thiết kế để hoạt động mà không cần thu thập thông tin nhận dạng cá nhân (PII) như tên, email hoặc địa chỉ của bạn. Tuy nhiên, một số dữ liệu kỹ thuật có thể được thu thập tự động bởi nhà cung cấp dịch vụ lưu trữ web để duy trì hoạt động và an ninh, bao gồm:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Địa chỉ IP:</strong> Để phục vụ yêu cầu truy cập và chẩn đoán sự cố kỹ thuật.</li>
          <li><strong>Thông tin thiết bị và trình duyệt:</strong> Loại trình duyệt, hệ điều hành để đảm bảo khả năng tương thích.</li>
          <li><strong>Dữ liệu sử dụng (Phân tích):</strong> Thông tin ẩn danh về cách bạn tương tác với ứng dụng (ví dụ: các tính năng được sử dụng) để giúp chúng tôi cải thiện sản phẩm.</li>
          <li><strong>Cookies:</strong> Có thể được sử dụng bởi nền tảng lưu trữ để quản lý phiên làm việc.</li>
        </ul>

        <h2 className="text-2xl font-bold text-lime-900 pt-4">Mục đích sử dụng</h2>
        <p>
          Dữ liệu được thu thập chỉ nhằm các mục đích sau:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Cung cấp và duy trì hoạt động ổn định của ứng dụng.</li>
          <li>Phân tích và cải thiện trải nghiệm người dùng.</li>
          <li>Đảm bảo an ninh và ngăn chặn các hành vi lạm dụng.</li>
        </ul>

        <h2 className="text-2xl font-bold text-lime-900 pt-4">Bên thứ ba chia sẻ dữ liệu</h2>
        <p>
          Chúng tôi không bán hoặc chia sẻ dữ liệu cá nhân của bạn với các bên thứ ba cho mục đích tiếp thị. Dữ liệu kỹ thuật có thể được chia sẻ với:
        </p>
        <ul className="list-disc list-inside space-y-2 pl-4">
          <li><strong>Nhà cung cấp dịch vụ lưu trữ (Hosting):</strong> Nền tảng mà ứng dụng này được triển khai có thể có quyền truy cập vào nhật ký máy chủ.</li>
          <li><strong>Dịch vụ phân tích (Analytics):</strong> Chúng tôi có thể sử dụng các công cụ như Google Analytics để thu thập dữ liệu sử dụng ẩn danh.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-lime-900 pt-4">Cách người dùng kiểm soát</h2>
        <p>
          Bạn có thể kiểm soát việc thu thập dữ liệu thông qua các cài đặt trên trình duyệt của mình, chẳng hạn như xóa hoặc chặn cookies.
        </p>

        <h2 className="text-2xl font-bold text-lime-900 pt-4">Thông tin liên hệ</h2>
        <p>
          Nếu bạn có bất kỳ câu hỏi nào về chính sách quyền riêng tư này, vui lòng liên hệ với nhà phát triển:
        </p>
        <p><strong>Nguyễn Thành Đạt</strong></p>
        <p>Email: <a href="mailto:tailieuhuyenhoc.com@gmail.com" className="underline">tailieuhuyenhoc.com@gmail.com</a></p>
      </div>
    </PageContainer>
  );
};


// --- Main App / Homepage ---
const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'advice' | 'pixel' | 'story' | 'palette' | 'dice' | 'coinFlip' | 'guessNumber' | 'location' | 'sound' | 'song' | 'fact' | 'emoji' | 'password' | 'website' | 'decision' | 'slotMachine' | 'movie' | 'symbol' | 'randomNumber' | 'privacy' | 'quote'>('home');

  const renderContent = () => {
    switch (currentPage) {
      case 'advice':
        return <AdviceApp onBack={() => setCurrentPage('home')} />;
      case 'pixel':
        return <PixelArtApp onBack={() => setCurrentPage('home')} />;
      case 'story':
        return <StoryApp onBack={() => setCurrentPage('home')} />;
      case 'palette':
        return <ColorPaletteApp onBack={() => setCurrentPage('home')} />;
      case 'dice':
        return <DiceApp onBack={() => setCurrentPage('home')} />;
      case 'coinFlip':
        return <CoinFlipApp onBack={() => setCurrentPage('home')} />;
      case 'guessNumber':
        return <GuessNumberApp onBack={() => setCurrentPage('home')} />;
      case 'location':
        return <LocationApp onBack={() => setCurrentPage('home')} />;
      case 'sound':
        return <SoundApp onBack={() => setCurrentPage('home')} />;
      case 'song':
        return <SongApp onBack={() => setCurrentPage('home')} />;
      case 'fact':
        return <FactApp onBack={() => setCurrentPage('home')} />;
      case 'emoji':
        return <EmojiApp onBack={() => setCurrentPage('home')} />;
      case 'password':
        return <PasswordApp onBack={() => setCurrentPage('home')} />;
       case 'website':
        return <WebsiteApp onBack={() => setCurrentPage('home')} />;
      case 'decision':
        return <DecisionApp onBack={() => setCurrentPage('home')} />;
      case 'slotMachine':
        return <SlotMachineApp onBack={() => setCurrentPage('home')} />;
      case 'movie':
        return <MovieApp onBack={() => setCurrentPage('home')} />;
      case 'symbol':
        return <SymbolApp onBack={() => setCurrentPage('home')} />;
      case 'randomNumber':
        return <RandomNumberApp onBack={() => setCurrentPage('home')} />;
      case 'quote':
        return <QuoteApp onBack={() => setCurrentPage('home')} />;
      case 'privacy':
        return <PrivacyPolicyPage onBack={() => setCurrentPage('home')} />;
      default:
        return (
          <div className="flex flex-col items-center min-h-screen p-4 text-center animate-fade-in">
            <div className="flex-grow flex flex-col items-center justify-center w-full py-8">
                <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-lime-900 mb-4 text-shadow-sm">
                  Sự Ngẫu Nhiên
                </h1>
                <p className="text-lg sm:text-xl text-lime-700 mb-12 max-w-2xl">
                  Chào mừng bạn đến với các lựa chọn ngẫu nhiên.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 w-full max-w-4xl">
                  <button onClick={() => setCurrentPage('advice')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                    <span>Lời Khuyên Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('pixel')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                    <span>Vẽ Hình Pixel Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('story')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" /></svg>
                    <span>Kể Chuyện Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('palette')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" /></svg>
                    <span>Máy Tạo Màu Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('dice')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    <span>Gieo Xúc Xắc Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('coinFlip')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 12L3 8m4 8l4-8m-4 8H3m4 0h4m9 4v-4m0 4l4-8m-4 8l-4-8m4 8h4m-4 0h-4" /></svg>
                    <span>Tung Đồng Xu Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('guessNumber')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                    <span>Đoán Số Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('location')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                    <span>Địa Điểm Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('sound')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" /></svg>
                    <span>Âm Thanh Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('song')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z" /></svg>
                    <span>Bài Nhạc Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('fact')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                    <span>Sự Thật Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('emoji')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Bộ Tạo Biểu Cảm Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('password')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1.258a1 1 0 01-.97-1.243l1.263-6.318a1 1 0 01.97-.757H7M15 7V5a2 2 0 00-2-2h-.085a2 2 0 00-1.734.936L10.5 6H15z" /></svg>
                    <span>Tạo Mật Khẩu Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('website')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" /></svg>
                    <span>Website Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('decision')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    <span>Quyết Định Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('slotMachine')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.783-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" /></svg>
                    <span>Máy Quay Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('movie')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
                    <span>Phim Ngẫu Nhiên</span>
                  </button>
                   <button onClick={() => setCurrentPage('symbol')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 11c-1.657 0-3 1.343-3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm0 0c-1.657 0-3-1.343-3-3s1.343-3 3-3 3 1.343 3 3-1.343 3-3-3zm0 0c1.657 0 3 1.343 3 3s1.343 3 3 3 3-1.343 3-3-1.343-3-3-3zm0 0c-1.657 0-3 1.343-3 3s-1.343 3-3 3-3-1.343-3-3 1.343-3 3-3z" /></svg>
                    <span>Kí Hiệu Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('randomNumber')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" /></svg>
                    <span>Bấm Số Ngẫu Nhiên</span>
                  </button>
                  <button onClick={() => setCurrentPage('quote')} className="bg-white/70 hover:bg-white backdrop-blur-sm text-lime-800 font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center gap-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.5 3A2.5 2.5 0 003 5.5V11a2.5 2.5 0 005 0V8.5a.5.5 0 011 0V11a3.5 3.5 0 11-7 0V5.5A3.5 3.5 0 015.5 2h.09a.5.5 0 01.401.595L5.41 4.59a.5.5 0 01-.595.401H5.5zM14.5 3A2.5 2.5 0 0012 5.5V11a2.5 2.5 0 005 0V8.5a.5.5 0 011 0V11a3.5 3.5 0 11-7 0V5.5A3.5 3.5 0 0114.5 2h.09a.5.5 0 01.401.595l-.58 1.99a.5.5 0 01-.595.401h-.001z" clipRule="evenodd" />
                    </svg>
                    <span>Danh Ngôn Ngẫu Nhiên</span>
                  </button>
                </div>
            </div>
             <footer className="w-full py-4 text-center text-lime-600 text-sm shrink-0">
              <p>Phát triển bởi Nguyễn Thành Đạt</p>
              <button onClick={() => setCurrentPage('privacy')} className="underline hover:text-lime-800 transition-colors">
                Chính sách Quyền riêng tư
              </button>
            </footer>
          </div>
        );
    }
  };

  return <main>{renderContent()}</main>;
};

export default App;
