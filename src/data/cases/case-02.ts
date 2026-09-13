import type { CaseFile } from "../case-types";

export const case02: CaseFile = {
  id: "case-02",
  number: "02",
  codename: "NGƯỜI ĐÀN BÀ Ở BẾN 9",
  title: "Người đàn bà ở bến 9",
  slot: { cabinet: "left", drawer: 1 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ SW–1954",
      title: "Rạng sáng ở khu cảng",
      html: `<p class="paper-lead">Người gác bến tìm thấy cô lúc 5 giờ sáng, nằm ngay dưới bến số 9, thủy triều vừa rút.</p>
        <p>Lenora Voss, 27 tuổi, ca sĩ phòng trà tại <strong>Câu Lạc Bộ Sóng Bạc</strong> (Silver Wave), khu cảng. Người ta đầu tiên nghĩ là một cú ngã — bến tàu trơn, đêm không đèn.</p>
        <p>Nhưng khăn choàng của cô ướt sũng, nằm cách xa vị trí "ngã" hơn ba mét. Giày cô vẫn khô, xếp ngay ngắn trên bến — như thể ai đó đã cởi ra cho cô, chứ không phải cô tự cởi.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Một người gác bến vô danh, giờ đã hết ca từ nửa đêm.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Vết bầm hai cổ tay",
      html: `<p>Pháp y ghi nhận vết bầm hình ngón tay ở cả hai cổ tay nạn nhân — dấu hiệu bị giữ chặt trước khi rơi xuống nước, không phải trượt ngã tự nhiên.</p>
        <p>Cô rời câu lạc bộ lúc 23:10 theo lời người phục vụ cuối cùng gặp cô. Bến tàu chỉ cách club chưa đầy năm phút đi bộ.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Bốn người biết cô tối đó: người quản lý đang lo tiền vé, người nhạc công yêu cô trong im lặng, người quản đốc bến ký sổ ra cổng, và người hôn phu đang chuẩn bị ra khơi. Một trong số họ đã đi cùng cô đến tận mép nước.</p>`,
    },
  ],
  coverPortraitId: "c2-victim",
  suspects: [
    {
      id: "s2-marsh",
      name: "Teddy Marsh",
      role: "Quản lý Câu Lạc Bộ Sóng Bạc · 44 tuổi",
      alibi: "Khai đang kiểm kê rượu trong kho suốt buổi tối.",
      note: "Bị nạn nhân dọa báo cảnh sát vì gian lận vé số cuối tuần. Quán do một nhà đầu tư giấu mặt góp vốn, ký séc dưới cái tên \"C.W.\"",
      portraitId: "c2-marsh",
    },
    {
      id: "s2-fenn",
      name: "Louis Fenn",
      role: "Nhạc công piano của club · 29 tuổi",
      alibi: "Chơi nhạc trên sân khấu đến 23:00, nhiều khách làm chứng.",
      note: "Viết hàng chục lá thư tình chưa từng gửi cho nạn nhân.",
      portraitId: "c2-fenn",
    },
    {
      id: "s2-adler",
      name: "Gus Adler",
      role: "Quản đốc bến tàu · 55 tuổi",
      alibi: "Khai đang ngủ trong chòi trực từ 22:00.",
      note: "Người cuối cùng ký sổ ra cổng cho nạn nhân đi qua bến.",
      portraitId: "c2-adler",
    },
    {
      id: "s2-doyle",
      name: "Frank Doyle",
      role: "Thủy thủ, hôn phu của nạn nhân · 31 tuổi",
      alibi: "Khai đang xếp hành lý trên tàu, chuẩn bị nhổ neo lúc nửa đêm.",
      note: "Tàu của anh ta cập bến thường xuyên ở một cảng khác, nơi có người phụ nữ đăng ký tên anh làm chồng.",
      portraitId: "c2-doyle",
    },
  ],
  evidence: [
    {
      id: "ev2-matchbook",
      name: "Diêm quẹt in giờ đóng cửa",
      kicker: "TANG VẬT 01",
      detail: "Vỏ diêm của club đóng dấu giờ \"23:10\" — đúng lúc nạn nhân được thấy rời quán lần cuối.",
      source: "file",
    },
    {
      id: "ev2-bruise",
      name: "Báo cáo pháp y",
      kicker: "TANG VẬT 02",
      detail: "Vết bầm hình ngón tay ở hai cổ tay — dấu hiệu bị giữ chặt, không phải một cú ngã tự nhiên.",
      source: "file",
    },
    {
      id: "ev2-letters",
      name: "Xấp thư tình chưa gửi",
      kicker: "TANG VẬT 03",
      detail: "Của Louis Fenn, hàng chục lá — yêu đơn phương, không một dòng đe dọa hay oán trách.",
      source: "file",
    },
    {
      id: "ev2-logbook",
      name: "Sổ ra cổng bến",
      kicker: "TANG VẬT 04",
      detail: "Adler ký nhận nạn nhân ra bến lúc 23:15, đi cùng \"một người đàn ông mặc đồ thủy thủ.\"",
      source: "file",
    },
    {
      id: "ev2-payroll",
      name: "Biên nhận lương bị giữ",
      kicker: "TANG VẬT 05",
      detail: "Cho thấy Marsh còn nợ nạn nhân một khoản lương — động cơ tài chính, nhưng khá yếu.",
      source: "file",
    },
    {
      id: "ev2-seaman",
      name: "Sổ thủy thủ đoàn",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Frank Doyle đăng ký dưới một cái tên khác ở một cảng khác — dòng ghi chú: \"vợ: Nora Doyle.\"",
      source: "room",
      roomProp: "floor-key",
      shape: "book",
    },
    {
      id: "ev2-ring",
      name: "Một chiếc nhẫn cưới nhỏ",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Không phải cỡ tay của Lenora. Mặt trong khắc tên \"Nora.\"",
      source: "room",
      roomProp: "crumpled-note",
      shape: "ring",
    },
  ],
  testimonies: [
    {
      suspectId: "s2-marsh",
      text: "Cô ấy dọa tôi, đúng, vì vụ vé số. Nhưng tôi đang bận đếm chai rượu trong kho suốt buổi, có sổ kiểm kê làm chứng. Tôi không ra khỏi đó.",
    },
    {
      suspectId: "s2-fenn",
      text: "Tôi chưa từng nói với cô ấy một lời. Những lá thư đó... tôi định đốt hết. Tôi chơi nhạc tới lúc đóng cửa, ông hỏi cả trăm người khách hôm đó cũng được.",
    },
    {
      suspectId: "s2-adler",
      text: "Tôi ký sổ cho cô ấy qua cổng như mọi đêm. Có một người đàn ông đi cùng, mặc đồ thủy thủ, tôi không nhìn kỹ mặt. Rồi tôi vào chòi ngủ luôn, mệt cả ngày.",
    },
    {
      suspectId: "s2-doyle",
      text: "Tôi ở trên tàu cả tối, xếp đồ chờ nhổ neo. Cô ấy đến gặp tôi lúc mười một giờ, chúng tôi nói chuyện một lúc rồi tôi bảo cô về nghỉ. Đó là lần cuối tôi thấy cô còn sống.",
    },
  ],
  links: [
    {
      a: "ev2-matchbook",
      b: "ev2-logbook",
      insight:
        "Giờ rời club (23:10) và giờ ra bến (23:15) khớp nhau khít khao — ai đó đã đợi cô ngay ngoài club rồi cùng đi ra bến, chỉ năm phút sau.",
    },
    {
      a: "ev2-seaman",
      b: "ev2-ring",
      insight:
        "Sổ thủy thủ đoàn và chiếc nhẫn cùng chỉ về một điều: Frank Doyle đã có vợ ở một cảng khác, dưới một cái tên khác.",
    },
    {
      a: "ev2-bruise",
      b: "ev2-logbook",
      insight:
        "\"Một người đàn ông mặc đồ thủy thủ\" đi cùng nạn nhân ra bến, và vết bầm hình ngón tay ở hai cổ tay — bị giữ chặt ngay trước khi rơi xuống nước.",
    },
    {
      a: "ev2-letters",
      b: "ev2-payroll",
      insight:
        "Fenn và Marsh đều có điều để giấu, nhưng cả hai đều có người làm chứng cho từng phút buổi tối. Đây là hai lối đánh lạc hướng, không phải hai nghi phạm thật.",
    },
  ],
  methods: [
    { id: "m2-push", label: "Đẩy xuống bến sau khi giằng co", detail: "Khớp với vết bầm hai cổ tay và vị trí thi thể ngay dưới bến." },
    { id: "m2-strangle", label: "Bóp cổ trên bờ rồi đẩy xuống nước", detail: "Không khớp: không có vết siết ở cổ nạn nhân." },
    { id: "m2-lure", label: "Dụ lên tàu rồi bỏ mặc giữa biển", detail: "Không khớp: thi thể được tìm thấy ngay tại bến 9, không phải trên biển." },
  ],
  motives: [
    { id: "mo2-bigamy", label: "Giấu chuyện đã có vợ ở cảng khác", detail: "Cô sắp phát hiện ra cuộc hôn nhân kia trước khi tàu nhổ neo." },
    { id: "mo2-money", label: "Tranh giành khoản lương bị giữ", detail: "Một khoản tiền không lớn, khó là động cơ giết người." },
    { id: "mo2-jealousy", label: "Ghen tuông vì tình tay ba", detail: "Không ai trong hồ sơ thực sự có mối quan hệ tay ba với nạn nhân." },
  ],
  solution: { suspectId: "s2-doyle", methodId: "m2-push", motiveId: "mo2-bigamy" },
  requiredEvidence: ["ev2-matchbook", "ev2-bruise", "ev2-logbook", "ev2-seaman", "ev2-ring"],
  fragment: "SW–1954–03",
};
