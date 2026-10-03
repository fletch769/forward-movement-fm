import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import { API, CONTACT_TOPICS } from "@/constants";

const inputCls =
  "w-full bg-transparent border border-white/20 rounded-none px-5 py-4 text-white placeholder:text-zinc-600 focus:outline-none focus:border-acid transition-colors duration-300 text-lg";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    topic: "General enquiry",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const update = (key) => (e) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSending(true);
    try {
      await axios.post(`${API}/contact`, form);
      toast.success("Message sent — we'll be in touch soon.");
      setForm({ name: "", email: "", topic: "General enquiry", message: "" });
    } catch (err) {
      toast.error(
        err?.response?.data?.detail ||
          "Something went wrong. Please try again in a moment."
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="pt-44 pb-28 md:pt-56 md:pb-36" data-testid="contact-page">
      <div className="max-w-[92rem] mx-auto px-5 md:px-10">
        <FadeUp>
          <p className="text-acid text-sm font-bold uppercase tracking-[0.3em] mb-8">
            Contact Us
          </p>
        </FadeUp>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[15vw] sm:text-[11vw] lg:text-[10rem] mb-20 md:mb-28"
          data-testid="contact-heading"
        >
          <LineReveal delay={0.2} className="text-white">
            Talk To
          </LineReveal>
          <LineReveal delay={0.35} className="text-outline">
            The Movement
          </LineReveal>
        </h1>

        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-14">
            <FadeUp>
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
                  Email
                </p>
                <a
                  href="mailto:contact@forwardmovement.org.uk"
                  data-testid="contact-email-link"
                  className="inline-flex items-center gap-2 text-2xl md:text-3xl font-display uppercase tracking-tight text-acid hover:text-white transition-colors duration-300 break-all"
                >
                  contact@forwardmovement.org.uk
                  <ArrowUpRight className="w-7 h-7 shrink-0" />
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.15}>
              <div>
                <p className="text-sm uppercase tracking-widest text-zinc-500 mb-4">
                  Registered Charity
                </p>
                <p className="font-display text-3xl text-white">
                  No. 1191828
                </p>
                <p className="text-zinc-500 text-base mt-2">
                  England &amp; Wales
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="border border-white/10 bg-coal p-7">
                <p className="text-zinc-400 text-base leading-relaxed">
                  Whether you want to join a programme, volunteer, partner with
                  us or ask about housing support — send us a message and we aim
                  to reply within a few working days.
                </p>
              </div>
            </FadeUp>
          </div>

          <div className="lg:col-span-7">
            <FadeUp delay={0.15}>
              <form
                onSubmit={submit}
                className="border border-white/10 bg-coal p-7 md:p-12 space-y-7"
                data-testid="contact-form"
              >
                <div className="grid gap-7 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-sm uppercase tracking-widest text-zinc-400 mb-3"
                    >
                      Your Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      maxLength={120}
                      value={form.name}
                      onChange={update("name")}
                      placeholder="Jane Doe"
                      className={inputCls}
                      data-testid="contact-name-input"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-sm uppercase tracking-widest text-zinc-400 mb-3"
                    >
                      Your Email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      value={form.email}
                      onChange={update("email")}
                      placeholder="jane@example.com"
                      className={inputCls}
                      data-testid="contact-email-input"
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="contact-topic"
                    className="block text-sm uppercase tracking-widest text-zinc-400 mb-3"
                  >
                    Topic
                  </label>
                  <select
                    id="contact-topic"
                    value={form.topic}
                    onChange={update("topic")}
                    className={`${inputCls} appearance-none cursor-pointer bg-coal`}
                    data-testid="contact-topic-select"
                  >
                    {CONTACT_TOPICS.map((topic) => (
                      <option key={topic} value={topic} className="bg-coal">
                        {topic}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-sm uppercase tracking-widest text-zinc-400 mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={7}
                    value={form.message}
                    onChange={update("message")}
                    placeholder="Tell us how we can help..."
                    className={`${inputCls} resize-y`}
                    data-testid="contact-message-textarea"
                  />
                </div>
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center gap-3 bg-acid text-ink font-bold uppercase tracking-widest text-base px-10 py-5 hover:bg-acid-hover hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
                  data-testid="contact-submit-button"
                >
                  {sending ? (
                    <>
                      Sending
                      <Loader2 className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-5 h-5" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
