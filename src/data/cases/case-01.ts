import type { CaseFile } from "../case-types";

export const case01: CaseFile = {
  id: "case-01",
  number: "01",
  codename: "NGỌN ĐÈN TẮT LÚC 21:47",
  title: "Ngọn đèn tắt lúc 21:47",
  slot: { cabinet: "left", drawer: 0 },
  state: "playable",
  brief: [
    {
      kicker: "BÁO CÁO HIỆN TRƯỜNG / HỒ SƠ AL–1953",
      title: "Đêm 14 tháng 11, 1953",
      html: `<p class="paper-lead">Mưa từ chiều. Đến khuya thì cả khu Wexford chỉ còn một ô cửa sổ sáng đèn — tầng chín.</p>
        <p>Marlowe Finch, 52 tuổi, kế toán trưởng hãng vận tải <strong>Ardent Line</strong>, được tìm thấy gục trên bàn làm việc lúc 22:35. Bác sĩ pháp y ước tính thời điểm tử vong trong khoảng <strong>21:30 – 21:50</strong>.</p>
        <p>Cửa phòng khóa từ bên trong. Két sắt mở toang. Cuốn sổ cái của hãng nằm trên bàn, <strong>thiếu đúng một trang</strong>.</p>
        <div class="assessment"><span>NGƯỜI PHÁT HIỆN</span><p>Oscar Pym, bảo vệ ca đêm, trong lượt tuần tra thứ hai.</p></div>`,
    },
    {
      kicker: "KHÁM NGHIỆM SƠ BỘ",
      title: "Những gì căn phòng nói",
      html: `<p>Không có dấu vết cạy phá. Không có vết thương ngoài. Trên mặt bàn có <strong>hai chiếc ly</strong> — dù theo lời mọi nhân viên, Finch luôn uống một mình.</p>
        <p>Đèn bàn ở vị trí <strong>TẮT</strong>. Nhưng khi khám nghiệm, bóng đèn vẫn còn ấm.</p>
        <p>Một người nào đó đã ở lại trong căn phòng này sau khi Marlowe Finch ngừng thở — đủ lâu để rót, để lau, để tắt đèn, và để xé đi một trang giấy.</p>
        <div class="margin-note">Ghi chú của thám tử</div>
        <p>Bốn người có mặt trong hồ sơ. Ba người có bằng chứng ngoại phạm nghe rất trơn tru. Trơn tru là thứ đáng ngờ nhất trong nghề này.</p>`,
    },
  ],
  coverPortraitId: "c1-victim",
  suspects: [
    {
      id: "s-cross",
      name: "Vivian Cross",
      role: "Thư ký riêng của nạn nhân · 34 tuổi",
      alibi: "Khai rời văn phòng lúc 20:30 để về chăm mẹ ốm.",
      note: "Người duy nhất giữ chìa khóa phụ của phòng kế toán.",
      portraitId: "c1-cross",
    },
    {
      id: "s-hale",
      name: "Desmond Hale",
      role: "Đối tác hãng tàu · 47 tuổi",
      alibi: "Khai ở câu lạc bộ Ellery từ 20:00 đến nửa đêm, có nhân chứng.",
      note: "Đang nợ Ardent Line một khoản lớn, đã hai lần cãi vã với nạn nhân. Câu lạc bộ Ellery, nơi anh ta có mặt cả tối, nghe đâu có một cổ đông giấu mặt chỉ ký tắt \"C.W.\"",
      portraitId: "c1-hale",
    },
    {
      id: "s-pym",
      name: "Oscar Pym",
      role: "Bảo vệ ca đêm · 61 tuổi",
      alibi: "Đi tuần từ tầng trệt lên, khai chỉ tới tầng chín lúc 22:30.",
      note: "Người phát hiện thi thể. Phải dùng chìa dự phòng để mở cửa.",
      portraitId: "c1-pym",
    },
    {
      id: "s-renn",
      name: "Claudia Renn",
      role: "Em gái nạn nhân · 40 tuổi",
      alibi: "Khai ở nhà cả đêm, một mình.",
      note: "Người thừa kế duy nhất. Đang chờ anh trai ký giấy phân chia tài sản.",
      portraitId: "c1-renn",
    },
  ],
  evidence: [
    {
      id: "ev-log",
      name: "Sổ quẹt thẻ ra vào",
      kicker: "TANG VẬT 01",
      detail:
        "Thẻ nhân viên của V. Cross ghi nhận rời tòa nhà lúc 21:52 — muộn hơn lời khai của cô ta một tiếng hai mươi phút.",
      source: "file",
    },
    {
      id: "ev-lamp",
      name: "Đèn bàn còn ấm",
      kicker: "TANG VẬT 02",
      detail:
        "Công tắc ở vị trí TẮT nhưng bóng đèn vẫn ấm lúc 22:35. Ai đó đã tắt nó rất lâu sau khi nạn nhân gục xuống.",
      source: "file",
    },
    {
      id: "ev-glass",
      name: "Chiếc ly thứ hai",
      kicker: "TANG VẬT 03",
      detail:
        "Hai ly whisky trên bàn. Ly của nạn nhân đầy dấu vân tay. Ly còn lại đã được lau sạch đến mức không còn một vết nào.",
      source: "file",
    },
    {
      id: "ev-ticket",
      name: "Vé tàu đêm đi Bellhaven",
      kicker: "TANG VẬT 04",
      detail:
        "Chuyến 23:40 cùng đêm, mang tên V. Cross, mua trước đó ba ngày. Một chuyến đi được chuẩn bị, không phải một chuyến chạy trốn vội vàng.",
      source: "file",
    },
    {
      id: "ev-letter",
      name: "Thư nặc danh",
      kicker: "TANG VẬT 05",
      detail:
        "Gửi tới bàn làm việc của Finch tuần trước: «Trả lại những gì ông đã lấy, trước ngày 15.» Nét chữ nam giới, giấy của câu lạc bộ Ellery.",
      source: "file",
    },
    {
      id: "ev-ledger",
      name: "Mép trang sổ cái bị xé",
      kicker: "TANG VẬT 06 / THU TẠI PHÒNG LƯU TRỮ",
      detail:
        "Mẩu giấy rách còn dính dãy số hiệu tài khoản. Mực và giấy trùng khớp cuốn sổ cái Ardent Line — trang bị xé ghi các khoản chi khống suốt mười một tháng.",
      source: "room",
      roomProp: "under-desk",
      shape: "paper",
    },
    {
      id: "ev-button",
      name: "Cúc áo măng tô xà cừ",
      kicker: "TANG VẬT 07 / THU TẠI PHÒNG LƯU TRỮ",
      detail:
        "Cúc xà cừ từ áo khoác nữ, nhặt dưới gầm bàn nạn nhân. Loại cúc chỉ dùng cho hàng may đo — không phải đồ công sở bình thường.",
      source: "room",
      roomProp: "evidence-box",
      shape: "button",
    },
  ],
  testimonies: [
    {
      suspectId: "s-cross",
      text:
        "Tôi về lúc tám rưỡi. Mẹ tôi ốm, tôi phải kịp chuyến xe điện cuối. Lúc tôi đi ông Finch vẫn ngồi đó, vẫn cái đèn đó. Ông ấy nói còn vài con số phải soát lại.",
    },
    {
      suspectId: "s-hale",
      text:
        "Tôi nợ ông ta, đúng. Nhưng người chết thì trả được gì cho tôi? Cả câu lạc bộ Ellery nhìn thấy tôi tới tận nửa đêm. Ông cứ đi mà hỏi.",
    },
    {
      suspectId: "s-pym",
      text:
        "Tôi đi tuần từ dưới lên, vòng thứ hai mới tới tầng chín, tầm mười giờ rưỡi. Cửa khóa. Tôi gọi ba lần rồi mới lấy chìa dự phòng. Đèn trong phòng đã tắt ngóm.",
    },
    {
      suspectId: "s-renn",
      text:
        "Anh tôi keo kiệt, nhưng không phải kẻ trộm. Nếu sổ sách có gì mờ ám thì ai đó đã ép anh ấy im lặng. Tôi chỉ muốn biết là ai.",
    },
  ],
  links: [
    {
      a: "ev-log",
      b: "ev-ticket",
      insight:
        "Cross khai về lúc 20:30, nhưng thẻ quẹt lúc 21:52 và trong túi là vé chuyến 23:40 mua từ ba ngày trước. Cô ta không về — cô ta ở lại chờ, rồi mới đi.",
    },
    {
      a: "ev-lamp",
      b: "ev-glass",
      insight:
        "Một chiếc ly được lau sạch, một ngọn đèn được tắt muộn. Hung thủ không bỏ chạy ngay: kẻ đó nán lại dọn dẹp dấu vết của chính mình.",
    },
    {
      a: "ev-ledger",
      b: "ev-button",
      insight:
        "Trang sổ cái bị xé và một chiếc cúc áo nữ ngay dưới gầm bàn. Người lục sổ sách là phụ nữ, và đã quỳ xuống ngay tại chỗ đó.",
    },
    {
      a: "ev-letter",
      b: "ev-ledger",
      insight:
        "Lá thư đòi «trả lại những gì ông đã lấy» trỏ về Hale. Nhưng trang sổ cái bị xé cho thấy thứ bị lấy nằm trong chính sổ sách của Finch — và người xé nó muốn nó biến mất mãi mãi.",
    },
  ],
  methods: [
    { id: "m-poison", label: "Bỏ độc vào ly rượu", detail: "Rót cùng nạn nhân một ly, rồi lau sạch ly của mình." },
    { id: "m-strangle", label: "Bóp cổ rồi dựng hiện trường", detail: "Cần sức vóc và để lại vết trên cổ nạn nhân." },
    { id: "m-window", label: "Đẩy qua cửa sổ tầng chín", detail: "Không khớp: thi thể được tìm thấy trong phòng." },
  ],
  motives: [
    { id: "mo-embezzle", label: "Che giấu vụ biển thủ", detail: "Xóa dấu các khoản chi khống trong sổ cái." },
    { id: "mo-inherit", label: "Tranh chấp thừa kế", detail: "Đẩy nhanh việc phân chia tài sản của nạn nhân." },
    { id: "mo-revenge", label: "Trả thù chuyện tình cảm", detail: "Một mối quan hệ bị phản bội trong quá khứ." },
  ],
  solution: { suspectId: "s-cross", methodId: "m-poison", motiveId: "mo-embezzle" },
  requiredEvidence: ["ev-log", "ev-lamp", "ev-glass", "ev-ledger", "ev-button"],
  fragment: "AL–1953–07",
};
