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
    "Rome, Ý", "Seoul, Hàn Quốc", "Singapore, Singapore", "Stockholm, Thụy Điển", "Tehran, Iran",
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


// --- Main App / Homepage ---
const App = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'advice' | 'pixel' | 'story' | 'palette' | 'dice' | 'coinFlip' | 'guessNumber' | 'location' | 'sound' | 'song' | 'fact' | 'emoji' | 'password' | 'website'>('home');

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
                </div>
            </div>
            <footer className="w-full py-4 text-lime-600 text-sm shrink-0">
              Phát triển bởi Nguyễn Thành Đạt
            </footer>
          </div>
        );
    }
  };

  return <main>{renderContent()}</main>;
};

export default App;
