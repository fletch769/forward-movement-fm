import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import { LineReveal, FadeUp } from "@/components/Reveal";
import { API, CONTACT_TOPICS } from "@/constants";

const inputCls =
  "w-full bg-transparent border border-white/20 rounded-none px-4 py-3.5 text-white placeholder:text-zinc-600 focus:outline-none focus:border-acid transition-colors duration-300 text-base";

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
    <section className="pt-40 pb-24 md:pt-52 md:pb-32" data-testid="contact-page">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <FadeUp>
          <p className="text-acid text-xs font-bold uppercase tracking-[0.3em] mb-6">
            Contact Us
          </p>
        </FadeUp>
        <h1
          className="font-display uppercase leading-[0.88] tracking-tight text-[14vw] sm:text-[10vw] lg:text-[8rem] mb-16 md:mb-24"
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
          <div className="lg:col-span-5 space-y-12">
            <FadeUp>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                  Email
                </p>
                <a
                  href="mailto:contact@forwardmovement.org.uk"
                  data-testid="contact-email-link"
                  className="inline-flex items-center gap-2 text-xl md:text-2xl font-display uppercase tracking-tight text-acid hover:text-white transition-colors duration-300 break-all"
                >
                  contact@forwardmovement.org.uk
                  <ArrowUpRight className="w-6 h-6 shrink-0" />
                </a>
              </div>
            </FadeUp>
            <FadeUp delay={0.1}>
              <div>
                <p className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
                  Registered Charity
                </p>
                <p className="font-display text-2xl text-white">
                  No. 1191828
                </p>
                <p className="text-zinc-500 text-sm mt-1">
                  England &amp; Wales
                </p>
              </div>
            </FadeUp>
            <FadeUp delay={0.2}>
              <div className="border border-white/10 bg-coal p-6">
                <p className="text-zinc-400 text-sm leading-relaxed">
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
                className="border border-white/10 bg-coal p-6 md:p-10 space-y-6"
                data-testid="contact-form"
              >
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs uppercase tracking-widest text-zinc-400 mb-2"
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
                      className="block text-xs uppercase tracking-widest text-zinc-400 mb-2"
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
                    className="block text-xs uppercase tracking-widest text-zinc-400 mb-2"
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
                    className="block text-xs uppercase tracking-widest text-zinc-400 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    required
                    minLength={5}
                    maxLength={5000}
                    rows={6}
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
                  className="inline-flex items-center gap-3 bg-acid text-ink font-bold uppercase tracking-widest text-sm px-8 py-4 hover:bg-acid-hover hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:hover:translate-y-0"
                  data-testid="contact-submit-button"
                >
                  {sending ? (
                    <>
                      Sending
                      <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4" strokeWidth={2.5} />
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
