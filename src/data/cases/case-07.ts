import type { CaseFile } from "../case-types";

export const case07: CaseFile = {
  id: "case-07",
  number: "07",
  codename: "HỒ SƠ NIÊM PHONG",
  title: "Hồ sơ niêm phong",
  slot: { cabinet: "right", drawer: 2 },
  state: "sealed",
  needFragments: 6,
  brief: [
    {
      kicker: "HỒ SƠ CÁ NHÂN / CORMAC WADE",
      title: "Người tiền nhiệm",
      html: `<p class="paper-lead">Sáu mảnh manh mối, sáu vụ án tưởng chừng không liên quan, đều dẫn về một ký tắt: <strong>C.W.</strong></p>
        <p>Cormac Wade, thám tử tiền nhiệm của ông, đã âm thầm ghép chúng lại suốt nhiều tháng: một câu lạc bộ, một sòng bạc, một nhà trọ, một chuyến tàu, một cuộn phim — tất cả cùng chảy tiền qua một mạng lưới, và cùng một người ký tên.</p>
        <p>Rồi một đêm, Wade rời văn phòng và không bao giờ trở lại. Ngăn kéo này bị dán niêm phong ngay sau đó.</p>
        <div class="assessment"><span>NGƯỜI KÝ TÊN NIÊM PHONG</span><p>Không ai xác nhận. Con dấu không thuộc phòng án tồn đọng.</p></div>`,
    },
    {
      kicker: "GHI CHÚ CUỐI CÙNG",
      title: "Viết tay, dừng giữa câu",
      html: `<p>Trang cuối trong hồ sơ của Wade chỉ có vài dòng, chữ viết vội: "Tôi đã có đủ để đối chất. C.W. không phải chỉ là một cổ đông giấu mặt — ông ta <em>là</em> mạng lưới. Nếu tôi không quay lại, hãy tìm H. — cô ấy có bản sao."</p>
        <p>Câu tiếp theo bị bỏ dở, ngòi bút vẽ một đường dài lệch khỏi trang giấy.</p>
        <div class="margin-note">Ghi chú của ông</div>
        <p>Bốn cái tên còn xuất hiện quanh Cornelius Wren, người thương gia đứng đắn đã ký tắt "C.W." trên mọi trang sổ sách của sáu vụ án trước.</p>`,
    },
  ],
  coverPortraitId: "c7-wade",
  suspects: [
    {
      id: "s7-wren",
      name: "Cornelius Wren",
      role: "Thương gia, chủ thật của mạng lưới sòng bạc và câu lạc bộ · 60 tuổi",
      alibi: "Khai không quen biết Cormac Wade, chỉ \"góp vốn, không điều hành\" bất cứ nơi nào trong sáu hồ sơ.",
      note: "Chữ ký tắt \"C.W.\" xuất hiện trên sổ sách của cả sáu vụ án.",
      portraitId: "c7-wren",
    },
    {
      id: "s7-halloway",
      name: "Bà Halloway",
      role: "Luật sư riêng của Wren · 49 tuổi",
      alibi: "Khai đang tham dự một phiên tòa ở thành phố khác đêm Wade mất tích.",
      note: "Ký hầu hết giấy tờ pháp lý che giấu dòng tiền của mạng lưới.",
      portraitId: "c7-halloway",
    },
    {
      id: "s7-bell",
      name: "Garrick Bell",
      role: "Cựu cảnh sát, \"cố vấn an ninh\" của Wren · 47 tuổi",
      alibi: "Khai mơ hồ về đêm Wade mất tích, không có ai xác nhận rõ.",
      note: "Có tiền án dùng vũ lực trước khi rời khỏi lực lượng cảnh sát.",
      portraitId: "c7-bell",
    },
    {
      id: "s7-lin",
      name: "Perpetua Lin",
      role: "Thư ký tòa án · 31 tuổi",
      alibi: "Khai chỉ giúp Wade sao chép hồ sơ công khai của tòa, không biết thêm gì khác.",
      note: "Người duy nhất Wade còn liên lạc trong tuần cuối trước khi mất tích.",
      portraitId: "c7-lin",
    },
  ],
  evidence: [
    {
      id: "ev7-ledgerfinal",
      name: "Trang sổ cái tổng hợp",
      kicker: "TANG VẬT 01",
      detail: "So khớp chữ ký \"C.W.\" trên cả sáu hồ sơ trước — cùng một người viết, cùng một nét bút với Cornelius Wren.",
      source: "file",
    },
    {
      id: "ev7-carreceipt",
      name: "Biên nhận thuê xe",
      kicker: "TANG VẬT 02",
      detail: "Thuê đúng đêm Wade mất tích, ký tên Garrick Bell.",
      source: "file",
    },
    {
      id: "ev7-note3",
      name: "Mảnh giấy trong ngăn kéo bàn của Wade",
      kicker: "TANG VẬT 03",
      detail: "\"Nếu tôi không quay lại, hãy tìm H. — cô ấy có bản sao.\"",
      source: "file",
    },
    {
      id: "ev7-courtcopy",
      name: "Bản sao hồ sơ tòa",
      kicker: "TANG VẬT 04",
      detail: "Do Perpetua Lin lặng lẽ chuyển cho Wade trước khi anh mất tích.",
      source: "file",
    },
    {
      id: "ev7-alibi",
      name: "Giấy xác nhận phiên tòa của Halloway",
      kicker: "TANG VẬT 05",
      detail: "Ngày ghi trên giấy trễ hơn ngày Wade mất tích đúng một tuần — giấy tờ có dấu hiệu bị làm lại.",
      source: "file",
    },
    {
      id: "ev7-photo3",
      name: "Bức ảnh từ hồ sơ Ruth Calloway, được rọi lớn",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Giờ có thể thấy rõ mặt hai người trao chiếc cặp da: một là Garrick Bell — người còn lại là chính Cormac Wade.",
      source: "room",
      roomProp: "under-desk",
      shape: "photo",
    },
    {
      id: "ev7-cufflink",
      name: "Một chiếc cúc măng-sét khắc \"C.W.\"",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Rơi lại ngay trong chính ngăn kéo niêm phong này — như thể ai đó đã từng đứng ở đây, không lâu trước khi Wade biến mất.",
      source: "room",
      roomProp: "evidence-box",
      shape: "button",
    },
  ],
  testimonies: [
    { suspectId: "s7-wren", text: "Tôi góp vốn vào nhiều nơi trong thành phố này, việc kinh doanh bình thường. Tôi không điều hành, không ra lệnh cho ai, và tôi chưa từng nghe tên Cormac Wade trước khi ông hỏi." },
    { suspectId: "s7-halloway", text: "Tôi làm luật sư cho ông Wren nhiều năm, giấy tờ tôi ký đều hợp pháp. Đêm đó tôi ở một phiên tòa khác thành phố, có hồ sơ tòa án ghi lại rõ ràng." },
    { suspectId: "s7-bell", text: "Tôi chỉ làm an ninh, chuyện ai đến ai đi tôi không nhớ hết. Đêm đó tôi không nhớ chính xác mình ở đâu, công việc của tôi thất thường lắm." },
    { suspectId: "s7-lin", text: "Tôi chỉ giúp anh Wade sao vài trang hồ sơ công khai, việc đó không sai luật. Anh ấy dặn tôi giữ kín, nói sẽ nguy hiểm nếu ai biết. Tôi sợ, nên tôi im lặng suốt từ đó." },
  ],
  links: [
    {
      a: "ev7-ledgerfinal",
      b: "ev7-photo3",
      insight: "Chữ ký \"C.W.\" trên sáu hồ sơ và bức ảnh cho thấy Garrick Bell nhận cặp da đúng từ mạng lưới của Wren — Bell là tay chân trực tiếp thực thi.",
    },
    {
      a: "ev7-carreceipt",
      b: "ev7-note3",
      insight: "Bell thuê xe đúng đêm Wade mất tích. Ghi chú cuối của Wade — \"tìm H.\" — cho thấy anh biết mình sắp gặp nguy hiểm và đã kịp để lại đầu mối.",
    },
    {
      a: "ev7-courtcopy",
      b: "ev7-alibi",
      insight: "Giấy xác nhận phiên tòa của Halloway bị làm lại ngày — bà không hề ở thành phố khác, mà đang giúp hợp lý hóa alibi cho Bell.",
    },
    {
      a: "ev7-cufflink",
      b: "ev7-ledgerfinal",
      insight: "Cúc măng-sét khắc \"C.W.\" rơi ngay trong ngăn kéo niêm phong này — chính Cornelius Wren, không phải Bell, đã tự tay đóng ngăn kéo này lại.",
    },
  ],
  methods: [
    { id: "m7-order", label: "Ra lệnh cho Bell \"xử lý\" rồi tự tay niêm phong hồ sơ", detail: "Khớp với biên nhận thuê xe của Bell và chiếc cúc măng-sét bỏ lại ngay trong ngăn kéo." },
    { id: "m7-direct", label: "Tự mình ra tay, không qua ai khác", detail: "Không khớp: nhân chứng khác xác nhận Wren không rời văn phòng riêng đêm đó." },
    { id: "m7-buyoff", label: "Chỉ đơn giản mua chuộc Wade để anh ta bỏ cuộc", detail: "Không khớp: ghi chú cuối cùng của Wade cho thấy anh không hề định bỏ cuộc." },
  ],
  motives: [
    { id: "mo7-network", label: "Bảo vệ mạng lưới rửa tiền xuyên suốt sáu vụ án", detail: "Wade đã có đủ chứng cứ để đối chất trực tiếp với Wren." },
    { id: "mo7-personal2", label: "Trả thù cá nhân với riêng Wade", detail: "Không có mối quan hệ cá nhân nào giữa Wren và Wade trước vụ điều tra." },
    { id: "mo7-family", label: "Che giấu một bí mật gia đình không liên quan đến tiền", detail: "Không có chi tiết nào trong hồ sơ ủng hộ hướng này." },
  ],
  solution: { suspectId: "s7-wren", methodId: "m7-order", motiveId: "mo7-network" },
  requiredEvidence: ["ev7-ledgerfinal", "ev7-carreceipt", "ev7-courtcopy", "ev7-photo3", "ev7-cufflink"],
  fragment: "CW–0000",
};
