// This is a basic Flutter widget test.
// To perform an interaction with a widget in your test, use the WidgetTester utility that Flutter
// provides. For example, you can send tap and scroll gestures. You can also use WidgetTester to
// find child widgets in the widget tree, read text, and verify that the values of widget properties
// are correct.

import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

import 'package:sample_project/main.dart';

void main() {
  test('1_api_t1', () {
    expect('1', '1');
  });

  test('1_api_t2', () {
    expect('1', '1');
  });

  test('1_api_t3', () {
    assert(true, true);
  });

  test('1_api_fail_t4', () {
    expect('1', '2');
  });
}
