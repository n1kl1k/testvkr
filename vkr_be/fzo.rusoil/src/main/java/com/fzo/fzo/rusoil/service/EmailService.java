package com.fzo.fzo.rusoil.service;

import com.fzo.fzo.rusoil.model.Subscriber;
import com.fzo.fzo.rusoil.repository.SubscriberRepository;
import jakarta.mail.internet.MimeMessage;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmailService {

    private final JavaMailSender mailSender;
    private final SubscriberRepository subscriberRepository;

    public EmailService(JavaMailSender mailSender, SubscriberRepository subscriberRepository) {
        this.mailSender = mailSender;
        this.subscriberRepository = subscriberRepository;
    }

    @Async
    public void sendNewsToSubscribers(String title, String shortText, String fullText) {
        List<Subscriber> subs = subscriberRepository.findAll();

        for (Subscriber sub : subs) {
            try {
                MimeMessage mimeMessage = mailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, false, "UTF-8");
                helper.setTo(sub.getEmail());
                helper.setFrom("niklik02@yandex.ru");
                helper.setSubject("Новая новость: " + title);
                helper.setText("Краткая информация: <br> "+shortText + "<br><br> Полная информация: <br>" + fullText, true);
                mailSender.send(mimeMessage);
            } catch (Exception e) {
                System.err.println("Ошибка отправки на " + sub.getEmail() + ": " + e.getMessage());
            }
        }
    }
}
