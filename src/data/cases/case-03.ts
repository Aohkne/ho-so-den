import type { CaseFile } from "../case-types";

export const case03: CaseFile = {
  id: "case-03",
  number: "03",
  codename: "BA PHÁT SÚNG, HAI VỎ ĐẠN",
  title: "Ba phát súng, hai vỏ đạn",
  slot: { cabinet: "left", drawer: 2 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ MG–1954",
      title: "Đêm giao thừa tại Sòng Bạc Magnolia",
      html: `<p class="paper-lead">Đúng nửa đêm, khi pháo hoa nổ rền ngoài phố, ba tiếng động lớn vang lên gần sàn bài VIP.</p>
        <p>Elias Grant, 50 tuổi, chủ nợ kiêm người bảo kê thật sự của <strong>Sòng Bạc Magnolia</strong>, được tìm thấy chết trong phòng làm việc riêng, một viên đạn xuyên ngực.</p>
        <p>Ít nhất năm người làm chứng nghe "ba tiếng nổ" cùng lúc pháo hoa. Nhưng khám nghiệm hiện trường chỉ tìm được <strong>hai vỏ đạn</strong> trên sàn phòng.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Ông Sáu Brody, vệ sĩ riêng, đứng gác ngay ngoài cửa.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Cửa không hề bị phá",
      html: `<p>Cửa phòng không có dấu cạy, không có lỗ đạn xuyên qua. Kẻ giết người phải là người được Grant tự mời vào, hoặc có chìa khóa riêng.</p>
        <p>Trong túi áo nạn nhân có một mảnh giấy hẹn gặp riêng ai đó viết tắt là "N." vào lúc nửa đêm.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Sổ nợ của Grant ghi rất nhiều tên. Nhưng chỉ một trang, trang cuối, ghi một khoản nợ không phải bằng tiền.</p>`,
    },
  ],
  coverPortraitId: "c3-victim",
  suspects: [
    {
      id: "s3-reed",
      name: "Dolores Reed",
      role: "Con bạc nợ Grant một khoản lớn · 38 tuổi",
      alibi: "Khai đang chơi bài ở sàn chính, nhiều người thấy suốt buổi.",
      note: "Nợ gần như không thể trả nổi trong năm nay.",
      portraitId: "c3-reed",
    },
    {
      id: "s3-kane",
      name: "Jimmy Kane",
      role: "Nhân viên đổi tiền của sòng · 26 tuổi",
      alibi: "Khai đang đổi tiền lẻ liên tục ở quầy thu ngân.",
      note: "Từng bị Grant dọa sa thải vì thiếu hụt quỹ nhỏ.",
      portraitId: "c3-kane",
    },
    {
      id: "s3-orsini",
      name: "Nadia Orsini",
      role: "Vợ cũ của nạn nhân, chủ một phần cổ phần sòng bạc · 41 tuổi",
      alibi: "Khai đang ở văn phòng riêng tầng trên, một mình.",
      note: "Luôn tự xưng là \"vợ cũ\", dù chưa ai từng thấy giấy ly hôn.",
      portraitId: "c3-orsini",
    },
    {
      id: "s3-brody",
      name: "Ông Sáu Brody",
      role: "Vệ sĩ riêng của nạn nhân · 50 tuổi",
      alibi: "Khai đứng gác ngay ngoài cửa phòng suốt buổi, không rời vị trí.",
      note: "Có chìa khóa riêng của phòng làm việc, khai chưa từng dùng tối đó.",
      portraitId: "c3-brody",
    },
  ],
  evidence: [
    {
      id: "ev3-casings",
      name: "Hai vỏ đạn trên sàn",
      kicker: "TANG VẬT 01",
      detail: "Chỉ tìm được hai, dù ít nhất năm người làm chứng nghe ba tiếng nổ cùng lúc pháo hoa giao thừa.",
      source: "file",
    },
    {
      id: "ev3-ledger",
      name: "Trang cuối sổ nợ",
      kicker: "TANG VẬT 02",
      detail: "Ghi tên Nadia Orsini nợ một khoản \"danh dự\", không phải tiền. Góc trang có một ký tắt mờ: \"vốn góp thầm lặng — C.W.\"",
      source: "file",
    },
    {
      id: "ev3-key",
      name: "Chìa khóa riêng của Brody",
      kicker: "TANG VẬT 03",
      detail: "Ông ta khai chưa từng dùng chìa khóa riêng của phòng làm việc tối đó.",
      source: "file",
    },
    {
      id: "ev3-glove",
      name: "Một chiếc găng tay da phụ nữ",
      kicker: "TANG VẬT 04",
      detail: "Đầu ngón cháy xém, dính mùi thuốc súng.",
      source: "file",
    },
    {
      id: "ev3-note",
      name: "Mảnh giấy hẹn gặp",
      kicker: "TANG VẬT 05",
      detail: "Trong túi áo Grant: hẹn gặp riêng \"N.\" lúc nửa đêm.",
      source: "file",
    },
    {
      id: "ev3-casing3",
      name: "Vỏ đạn thứ ba",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Lăn vào góc, kẹt dưới gầm bàn làm việc — bị bỏ lọt trong lần khám nghiệm đầu tiên.",
      source: "room",
      roomProp: "under-desk",
      shape: "bar",
    },
    {
      id: "ev3-photo",
      name: "Một tấm ảnh cưới cũ",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail: "Chụp Grant và Nadia Orsini trong lễ cưới. Mặt sau ghi ngày — hôn thú này chưa từng được hủy.",
      source: "room",
      roomProp: "evidence-box",
      shape: "photo",
    },
  ],
  testimonies: [
    { suspectId: "s3-reed", text: "Tôi nợ ông ta thật, nhiều là khác. Nhưng giết ông ta thì nợ càng khó xóa, người ta còn siết nợ tới cả người nhà tôi. Cả sàn bài thấy tôi chơi tới sáng." },
    { suspectId: "s3-kane", text: "Ông Grant hay dọa vậy, nhưng chưa đuổi ai thật bao giờ. Tôi đứng quầy đổi tiền không rời, khách đông nghịt đêm giao thừa, hỏi ai cũng biết." },
    { suspectId: "s3-orsini", text: "Chúng tôi chia tay lâu rồi, chuyện đó ai cũng biết. Tôi ở văn phòng trên tầng, một mình, soát lại giấy tờ cổ phần cuối năm. Ông hỏi tôi ký hôn thú lúc nào để làm gì?" },
    { suspectId: "s3-brody", text: "Tôi đứng ngay đó, cửa đóng, tôi nghe pháo hoa với mấy tiếng nổ lẫn vào nhau. Chìa khóa của tôi tối đó ở trong túi, tôi thề." },
  ],
  links: [
    {
      a: "ev3-casings",
      b: "ev3-casing3",
      insight: "Đủ ba vỏ đạn khi tính luôn cái tìm dưới gầm bàn — cả ba tiếng nổ đêm đó đều là đạn thật, không có tiếng nào là pháo hoa.",
    },
    {
      a: "ev3-glove",
      b: "ev3-note",
      insight: "Găng tay dính thuốc súng và mảnh giấy hẹn gặp riêng \"N.\" — cùng chỉ về một người có tên bắt đầu bằng chữ N.",
    },
    {
      a: "ev3-ledger",
      b: "ev3-photo",
      insight: "\"Khoản nợ danh dự\" trong sổ hóa ra là hôn thú chưa hủy. Nadia vẫn là vợ hợp pháp — không có quyền chia cổ phần nếu Grant còn sống và công khai điều đó.",
    },
    {
      a: "ev3-key",
      b: "ev3-casings",
      insight: "Brody có chìa khóa nhưng khai không dùng. Nếu đúng, chỉ còn một cách vào phòng mà không cần phá cửa: được chính Grant mời vào.",
    },
  ],
  methods: [
    { id: "m3-invited", label: "Bắn từ khoảng cách gần sau khi được mời vào phòng", detail: "Khớp với việc cửa không hề bị phá và hẹn gặp riêng trong túi áo nạn nhân." },
    { id: "m3-door", label: "Bắn từ ngoài cửa xuyên qua ổ khóa", detail: "Không khớp: cửa không có lỗ đạn." },
    { id: "m3-poison2", label: "Đầu độc rồi bắn xác để nghi là án mạng khác", detail: "Không khớp: pháp y xác nhận chết vì đạn, không có dấu độc." },
  ],
  motives: [
    { id: "mo3-marriage", label: "Ngăn Grant công khai hôn thú để chiếm cổ phần sòng bạc", detail: "Nếu hôn thú bị công khai, Nadia mất quyền với phần cổ phần bà đang giữ." },
    { id: "mo3-debt", label: "Trả nợ đánh bạc bằng cách xóa con nợ", detail: "Không hợp lý: giết chủ nợ không xóa được nợ, còn khiến việc siết nợ rối hơn." },
    { id: "mo3-fired", label: "Trả thù vì bị Grant sa thải oan", detail: "Không ai trong hồ sơ từng thực sự bị Grant sa thải." },
  ],
  solution: { suspectId: "s3-orsini", methodId: "m3-invited", motiveId: "mo3-marriage" },
  requiredEvidence: ["ev3-casings", "ev3-ledger", "ev3-glove", "ev3-casing3", "ev3-photo"],
  fragment: "MG–1954–05",
};
